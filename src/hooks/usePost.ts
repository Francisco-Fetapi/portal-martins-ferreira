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
        `/users/me?populate=post_saveds.post.post_reacts,post_saveds.post.post_comments,post_saveds.post.photo,post_saveds.post.user.photo`
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
      return sleep(1);
    },
    {
      onSuccess(data, props, context) {
        queryClient.setQueryData<ApiSavedPost | undefined>(
          "my_saved_posts",
          (prev) => {
            if (prev) {
              const alreadySaved = isSaved(props.post);
              const now = new Date().toString();
              if (!alreadySaved) {
                return {
                  ...prev,
                  post_saveds: [
                    ...prev.post_saveds,
                    {
                      createdAt: now,
                      updatedAt: now,
                      publishedAt: now,
                      post: props.post,
                      id: 2,
                    },
                  ],
                };
              } else {
                const post_saveds = prev.post_saveds.filter(
                  (post) => post.id !== props.post.id
                );
                return { ...prev, post_saveds };
              }
            }
            return prev;
          }
        );
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

  function updateAllPost(postId: number, post: ApiPost) {
    updatePost("all_posts", postId, post);
    updatePost("my_posts", postId, post);
    updatePost("others_posts", postId, post);
    updatePost("my_saved_posts", postId, post);
  }

  function updatePost(where: string, postId: number, newPost: ApiPost) {
    queryClient.setQueryData<ApiPost[] | ApiSavedPost | undefined>(
      where,
      (posts) => {
        if (!posts) return;

        const isArray = "map" in posts;
        if (isArray) {
          const allNewPosts = posts?.map((post) => {
            if (post.id === postId) {
              return newPost;
            }
            return post;
          });
          return allNewPosts;
        }
        if (!isArray) {
          // allPosts = posts.post_saveds.map((post_saved) => post_saved.post);
          const newSavedPosts = posts.post_saveds.map((post_saved) => {
            if (post_saved.post.id === postId) {
              return { ...post_saved, post: newPost };
            }
            return post_saved;
          });
          return { ...posts, post_saveds: newSavedPosts } as ApiSavedPost;
        }
      }
    );
  }

  function reactPostToggle(reacted: boolean, type: 1 | -1, post: ApiPost) {
    if (reacted) {
      const newPostReact = post.post_reacts.filter((post_react) => {
        return post_react.user.id !== user.id;
      });
      post.post_reacts = newPostReact;
      updateAllPost(post.id, post);
    } else {
      const now = new Date().toString();
      // const lastReact = post.post_reacts[post.post_reacts.length - 1];
      post.post_reacts.push({
        createdAt: now,
        updatedAt: now,
        publishedAt: now,
        type,
        user,
        id: Math.random(),
      });
      updateAllPost(post.id, post);
    }
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
    updateAllPost,
    reactPostToggle,
  };
}
