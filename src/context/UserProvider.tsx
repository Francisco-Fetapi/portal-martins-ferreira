import { createContext } from "react";
import { IUserLogged } from "../interfaces/IUser";

interface IUserContext {
  user: IUserLogged;
}

export const UserContext = createContext<IUserContext | null>(null);

interface UserProviderProps {
  user: IUserLogged;
  children: React.ReactNode;
}

export default function UserProvider({ user, children }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
