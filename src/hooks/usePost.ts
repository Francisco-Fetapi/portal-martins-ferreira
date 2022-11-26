import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ApiPaginated, ApiPost, ApiSavedPost } from "../api/interfaces";
import { strapi } from "../api/strapi";

export default function usePost() {
  const router = useRouter();
  const otherUserId = router.query.id;
  const iAmAtOtherProfilePage =
    router.pathname.includes("perfil") && !!otherUserId;
  const iAmAtSavedPostsPage = router.pathname.includes("noticias-guardadas");

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
        `/posts/approved?user_id=${otherUserId}`
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

  return { posts, myPosts, othersPosts, mySavedPosts };
}
