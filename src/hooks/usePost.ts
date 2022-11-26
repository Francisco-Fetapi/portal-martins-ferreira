import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ApiPaginated, ApiPost } from "../api/interfaces";
import { strapi } from "../api/strapi";

export default function usePost() {
  const router = useRouter();
  const otherUserId = router.query.id;
  const iAmAtOtherProfilePage =
    router.pathname.includes("perfil") && !!otherUserId;

  // paginate
  const posts = useQuery("all_posts", async () => {
    let res = await strapi.get<ApiPaginated<ApiPost[]>>("/posts/approved");
    return res.data;
  });
  const myPosts = useQuery("my_posts", async () => {
    let res = await strapi.get<ApiPaginated<ApiPost[]>>("/posts/mine");
    return res.data;
  });
  const othersPosts = useQuery(
    "others_posts",
    async () => {
      let res = await strapi.get<ApiPaginated<ApiPost[]>>(
        `/posts/approved?user_id=${otherUserId}`
      );
      console.log("Buscou outros postagem");
      console.log(res.data);
      return res.data;
    },
    {
      enabled: iAmAtOtherProfilePage,
    }
  );

  console.log(otherUserId);

  return { posts, myPosts, othersPosts };
}
