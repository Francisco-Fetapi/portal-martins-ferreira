import { IUserLogged } from "../interfaces/IUser";
import { IUserContext, UserContext } from "../context/UserProvider";
import { useContext } from "react";

export default function useUser() {
  const { user } = useContext(UserContext) as Required<IUserContext>;

  return { user };
}
