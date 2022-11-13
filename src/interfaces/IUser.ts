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
  phoneNumber?: number;
  myClass?: string;
  myCourse?: string;
  myGlade?: 10 | 11 | 12 | 13;
}
