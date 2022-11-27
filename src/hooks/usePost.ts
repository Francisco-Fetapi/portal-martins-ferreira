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
import { LIKED } from "../helpers/constants";

interface IWithPost {
  post: ApiPost;
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
      refetchOnMount: false,
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

  const savePostToggle = useMutation<unknown, unknown, IWithPost>(
    ({ post }) => {
      if (isSaved(post)) {
        const post_saved = mySavedPosts.data?.post_saveds.find(
          (post_saveds) => {
            return post_saveds.post.id === post.id;
          }
        );
        if (post_saved) {
          return strapi.delete("/post-saveds/" + post_saved.id);
        }
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
    return postFound;
  }

  useEffect(() => {
    console.log("Saved posts");
    console.log(mySavedPosts.data?.post_saveds);
  }, [mySavedPosts.data]);

  function updateAllPosts() {
    queryClient.refetchQueries();
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
  };
}
