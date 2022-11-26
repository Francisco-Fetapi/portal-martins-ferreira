import { useRouter } from "next/router";
import { useQuery } from "react-query";
import {
  ApiComment,
  ApiPaginated,
  ApiPost,
  ApiSavedPost,
} from "../api/interfaces";
import { strapi } from "../api/strapi";

export default function usePost() {
  const router = useRouter();
  const queryId = router.query.id;
  const iAmAtOtherProfilePage = router.pathname.includes("perfil") && !!queryId;
  const iAmAtSavedPostsPage = router.pathname.includes("noticias-guardadas");

  const iAmAtSomePost = router.pathname.includes("noticia") && !!queryId;

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
      enabled: iAmAtSavedPostsPage,
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

  return { posts, myPosts, postComments, othersPosts, mySavedPosts };
}
