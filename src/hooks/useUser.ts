import { strapi } from "../api/strapi";
import { useQuery } from "react-query";
import { IUserLogged } from "../interfaces/IUser";

export default function useUser() {
  const userLogged = useQuery<IUserLogged>(
    "user",
    async () => {
      const { data } = await strapi.get("/users/me?populate=photo");
      return data;
    },
    {
      cacheTime: 60 * 60 * 24,
      refetchOnMount: false,
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
