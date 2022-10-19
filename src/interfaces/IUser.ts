export type IGenre = "m" | "f";

export interface IUser {
  name: string;
  email: string;
  password1: string;
  password2: string;
  birthday: string;
  isStudent: boolean;
  genre: IGenre;

  photo?: string;
  phoneNumber?: string;
  myClass?: string;
  myCourse?: string;
  myGlade?: number;
}
