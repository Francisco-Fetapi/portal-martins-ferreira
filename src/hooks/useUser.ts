import { IUserLogged } from "../interfaces/IUser";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

export default function useUser() {
  const { user } = useContext(UserContext)!;

  return { user };
}
