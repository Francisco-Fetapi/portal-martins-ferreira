import { strapi } from "../api/strapi";
import { useQuery } from "react-query";
import { IUserLogged } from "../interfaces/IUser";
import { parseCookies } from "nookies";

export default function useUser() {
  const cookies = parseCookies();
  //   depois do logout clean cach form userLogged query
  const userLogged = useQuery<IUserLogged>(
    "user",
    async () => {
      const { data } = await strapi.get("/users/me?populate=photo");
      return data;
    },
    {
      enabled: !!cookies.token,
    }
  );

  if (userLogged.isLoading) {
    console.log("Recarregando user data");
  }

  //   const mutation = useMutation(postTodo, {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries('todos')
  //     },
  //   })
  return { userLogged };
}
