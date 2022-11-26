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

interface ISavePostParams {
  post: ApiPost;
}

export default function usePost() {
  const router = useRouter();
  const queryId = router.query.id;
  const iAmAtOtherProfilePage = router.pathname.includes("perfil") && !!queryId;
  const iAmAtSavedPostsPage = router.pathname.includes("noticias-guardadas");

  const iAmAtSomePost = router.pathname.includes("noticia") && !!queryId;
  const queryClient = useQueryClient();

  // paginate
  const posts = useQuery("all_posts", async () => {
    let res = await strapi.get<ApiPaginated<ApiPost[]>>("/posts/approved");
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
    "post_comments",
    async () => {
      let res = await strapi.get<ApiComment[]>(
        `/post/comments?post_id=${queryId}`
      );
      console.log(res.data);
      return res.data;
    },
    {
      enabled: iAmAtSomePost,
    }
  );

  const savePostToggle = useMutation<unknown, unknown, ISavePostParams>(
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

  useEffect(() => {
    console.log("Saved posts");
    console.log(mySavedPosts.data?.post_saveds);
  }, [mySavedPosts.data]);

  return {
    posts,
    myPosts,
    savePostToggle,
    postComments,
    othersPosts,
    mySavedPosts,
    isSaved,
  };
}
