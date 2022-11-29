import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  ApiComment,
  ApiPaginated,
  ApiPost,
  ApiSavedPost,
} from "../api/interfaces";
import { strapi } from "../api/strapi";
import { sleep } from "../helpers/sleep";
import { IUserLogged } from "../interfaces/IUser";
import { useEffect } from "react";
import useUser from "./useUser";
import { DISLIKED, LIKED } from "../helpers/constants";

interface IWithPost {
  post: ApiPost;
}
interface IWithComment {
  comment: ApiComment;
}
interface IPostComment {
  post: ApiPost;
  comment: string;
}
interface IEditComment extends IWithComment {
  content: string;
}

export default function usePost() {
  const router = useRouter();
  const { user } = useUser();
  const queryId = router.query.id;
  const iAmAtOtherProfilePage = router.pathname.includes("perfil") && !!queryId;
  // const iAmAtSavedPostsPage = router.pathname.includes("noticias-guardadas");

  const iAmAtSomePost = router.pathname.includes("noticia") && !!queryId;
  const queryClient = useQueryClient();

  // paginate
  const posts = useQuery("all_posts", async () => {
    let res = await strapi.get<ApiPost[]>("/posts/approved");
    return res.data;
  });
  const myPosts = useQuery("my_posts", async () => {
    let res = await strapi.get<ApiPost[]>("/posts/mine");
    return res.data;
  });
  const othersPosts = useQuery(
    "others_posts",
    async () => {
      let res = await strapi.get<ApiPost[]>(
        `/posts/approved?user_id=${queryId}`
      );
      return res.data;
    },
    {
      enabled: iAmAtOtherProfilePage,
    }
  );

  const mySavedPosts = useQuery(
    "my_saved_posts",
    async () => {
      let res = await strapi.get<ApiSavedPost>(
        `/users/me?populate=post_saveds.post.post_reacts.user,post_saveds.post.post_comments,post_saveds.post.photo,post_saveds.post.user.photo`
      );
      console.log(res.data);
      return res.data;
    },
    {
      // enabled: iAmAtSavedPostsPage,
      // refetchOnMount: false,
    }
  );

  const postComments = useQuery(
    ["post_comments", queryId],
    async () => {
      let res = await strapi.get<ApiComment[]>(
        `/post/comments?post_id=${queryId}`
      );
      console.log("comments", res.data);
      return res.data;
    },
    {
      enabled: iAmAtSomePost,
    }
  );

  function deleteFromSaveds(post: ApiPost) {
    const post_saved = mySavedPosts.data?.post_saveds.find((post_saveds) => {
      return post_saveds.post.id === post.id;
    })!;
    return strapi.delete("/post-saveds/" + post_saved.id);
  }

  const savePostToggle = useMutation<unknown, unknown, IWithPost>(
    ({ post }) => {
      // return sleep(10);
      if (isSaved(post)) {
        return deleteFromSaveds(post);
      }
      return strapi.post("/post-saveds", {
        data: {
          post,
          user,
        },
      });
    },
    {
      onSuccess(data, props, context) {
        // updateAllPosts();
        queryClient.refetchQueries(["my_saved_posts"]);
      },
    }
  );

  const deletePost = useMutation<unknown, unknown, IWithPost>(
    async ({ post }) => {
      if (post.photo) {
        await strapi.delete("/upload/files/" + post.photo.id);
      }
      if (isSaved(post)) {
        await deleteFromSaveds(post);
      }
      return strapi.delete("/posts/" + post.id);
    },
    {
      onSuccess(data, variables, context) {
        updateAllPosts();
      },
    }
  );

  const likePost = useMutation<unknown, unknown, IWithPost>(
    ({ post }) => {
      return strapi.post("/post-reacts", {
        data: {
          post,
          user,
          type: LIKED,
        },
      });
    },
    {
      onSuccess(data, variables, context) {
        updateAllPosts();
      },
    }
  );
  const dislikePost = useMutation<unknown, unknown, IWithPost>(
    ({ post }) => {
      return strapi.post("/post-reacts", {
        data: {
          post,
          user,
          type: DISLIKED,
        },
      });
    },
    {
      onSuccess(data, variables, context) {
        updateAllPosts();
      },
    }
  );
  const deleteReact = useMutation<unknown, unknown, IWithPost>(
    ({ post }) => {
      const post_react = post.post_reacts.find((post_react) => {
        return post_react.user.id === user.id;
      });
      return strapi.delete("/post-reacts/" + post_react?.id);
    },
    {
      onSuccess(data, variables, context) {
        updateAllPosts();
      },
    }
  );

  const likeComment = useMutation<unknown, unknown, IWithComment>(
    ({ comment }) => {
      return strapi.post("/comment-reacts", {
        data: {
          comment,
          user,
          type: LIKED,
        },
      });
    },
    {
      onSuccess(data, props, context) {
        updateComments();
      },
    }
  );
  const dislikeComment = useMutation<unknown, unknown, IWithComment>(
    ({ comment }) => {
      return strapi.post("/comment-reacts", {
        data: {
          comment,
          user,
          type: DISLIKED,
        },
      });
    },
    {
      onSuccess(data, props, context) {
        updateComments();
      },
    }
  );
  const deleteReactComment = useMutation<unknown, unknown, IWithComment>(
    ({ comment }) => {
      const post_react = comment.comment_reacts.find((post_react) => {
        return post_react.user.id === user.id;
      });
      return strapi.delete("/comment-reacts/" + post_react?.id);
    },
    {
      onSuccess(data, props, context) {
        updateComments();
      },
    }
  );

  const postComment = useMutation<unknown, unknown, IPostComment>(
    (props) => {
      return strapi.post("/post/comment", {
        content: props.comment,
        post: props.post,
      });
    },
    {
      onSuccess(data, props, context) {
        updateComments();
      },
    }
  );
  const editComment = useMutation<unknown, unknown, IEditComment>(
    ({ comment, content }) => {
      return strapi.put("/post-comments/" + comment.id, {
        data: {
          content,
        },
      });
    },
    {
      onSuccess(data, props, context) {
        updateComments();
      },
    }
  );
  const deleteComment = useMutation<unknown, unknown, IWithComment>(
    ({ comment }) => {
      return strapi.delete("/post-comments/" + comment.id);
    },
    {
      onSuccess(data, props, context) {
        updateComments();
        updateAllPosts();
      },
    }
  );

  function isSaved(post: ApiPost) {
    const post_saveds = mySavedPosts.data?.post_saveds;
    return post_saveds?.some((post_saved) => post_saved.post.id === post.id);
  }

  function getPostById(postId?: number) {
    // return queryClient.getQueryData("all_posts")!
    if (!postId) return undefined;

    function findOne(posts?: ApiPost[]) {
      return posts?.find((post) => post.id === postId);
    }
    let postFound: ApiPost | undefined;
    postFound = findOne(posts.data);
    if (!postFound) {
      postFound = findOne(myPosts.data);
    }
    if (!postFound) {
      postFound = findOne(
        mySavedPosts.data?.post_saveds.map((post_saved) => post_saved.post)
      );
    }
    if (!postFound) {
      postFound = findOne(othersPosts.data);
    }

    // if (postFound) {
    //   if (postFound.user === undefined) {
    //     postFound.user = user;
    //   }
    // }
    console.log(postFound);
    return postFound;
  }

  function updateAllPosts() {
    queryClient.refetchQueries();
  }
  function updateComments() {
    queryClient.refetchQueries("post_comments");
  }

  return {
    posts,
    myPosts,
    savePostToggle,
    postComments,
    othersPosts,
    mySavedPosts,
    isSaved,
    getPostById,
    likePost,
    dislikePost,
    deleteReact,
    postComment,
    likeComment,
    dislikeComment,
    deleteReactComment,
    deletePost,
    editComment,
    deleteComment,
  };
}
