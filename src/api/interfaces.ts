import { IUserLogged } from "../interfaces/IUser";

export interface ApiImageUploadedInfo {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  url: string;
  width: number;
}

export interface ApiUploadDataResponse {
  alternativeText: string | null;
  createdAt: string;
  ext: string;
  formats: {
    thumbnail: ApiImageUploadedInfo;
    medium: ApiImageUploadedInfo;
    large: ApiImageUploadedInfo;
    small: ApiImageUploadedInfo;
  };
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
  fullURL?: string;
}

interface withStatus {
  status: "success" | "error";
}
export interface ApiIsEmailVerified extends withStatus {}

export interface ApiRegister {
  jwt: string;
  user: IUserLogged;
}
export interface ApiLogin {
  jwt: string;
  user: IUserLogged;
}