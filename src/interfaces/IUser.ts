import { ApiUploadDataResponse } from "../api/interfaces";

export type IGenre = "m" | "f";

export interface IUser {
  username: string;
  email: string;
  password1: string;
  password2: string;
  birthday: string;
  isStudent: boolean;
  genre: IGenre;

  phoneNumber?: string;
  myClass?: string;
  myCourse?: string;
  myGlade?: 10 | 11 | 12 | 13;
}

export interface IUserLogged extends IUser {
  id: number;
  blocked: boolean;
  confirmed: boolean;
  createdAt?: string;
  updatedAt?: string;
  photo: ApiUploadDataResponse | null;
}
