import { useQuery } from "react-query";
import { ApiPaginated, ApiPost } from "../api/interfaces";
import { strapi } from "../api/strapi";

export default function usePost() {
  // paginate
  const posts = useQuery("all_posts", async () => {
    let res = await strapi.get<ApiPaginated<ApiPost[]>>("/posts/approved");
    return res.data;
  });

  console.log(posts);

  return { posts };
}
