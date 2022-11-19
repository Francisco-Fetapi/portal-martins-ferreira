import { createContext } from "react";
import { IUserLogged } from "../interfaces/IUser";
import { useState } from "react";

interface IUserContext {
  user: IUserLogged;
  photoPreviewURL: string;
  setPhotoPreviewURL: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<IUserContext | null>(null);

interface UserProviderProps {
  user: IUserLogged;
  children: React.ReactNode;
}

export default function UserProvider({ user, children }: UserProviderProps) {
  const [photoPreviewURL, setPhotoPreviewURL] = useState("");
  return (
    <UserContext.Provider value={{ user, photoPreviewURL, setPhotoPreviewURL }}>
      {children}
    </UserContext.Provider>
  );
}
