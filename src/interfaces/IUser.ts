export type IGenre = "m" | "f";

export interface IUser {
  username: string;
  email: string;
  password1: string;
  password2: string;
  birthday: string;
  isStudent: boolean;
  genre: IGenre;

  phoneNumber?: number;
  myClass?: string;
  myCourse?: string;
  myGlade?: 10 | 11 | 12 | 13;
}

export interface IUserLogged extends IUser {
  blocked: boolean;
  confirmed: boolean;
  photo_url: string;
  createdAt?: string;
  updatedAt?: string;
}
