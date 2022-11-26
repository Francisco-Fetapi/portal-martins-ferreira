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

export interface ApiRequest<T = any> {
  data: T;
}
export interface ApiResponse<T = any> {
  data: {
    id: number;
    attributes: T;
    meta: object;
  };
  meta: object;
}

interface ApiResponseDataOnly<T = any> {
  data: T;
}

export interface ApiComment extends ApiWithTimestamps {
  id: number;
  content: string;
  user: IUserLogged;
  comment_reacts: ApiReact[];
}
export interface ApiReact extends ApiWithTimestamps {
  id: number;
  type: number;
  user: IUserLogged;
}

export interface ApiWithTimestamps {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface IPost {
  title: string;
  content: string;
  approved: boolean;
}

export interface ApiPost extends ApiWithTimestamps, IPost {
  id: number;
  user: IUserLogged;
  photo: ApiUploadDataResponse | null;
  post_comments: ApiComment[];
  post_reacts: ApiReact[];
}

export interface ApiSavedPost extends IUserLogged {
  post_saveds: ({
    id: number;
    post: ApiPost;
  } & ApiWithTimestamps)[];
}

export interface ApiSinglePost extends IPost {
  user: ApiResponseData<IUserLogged>;
  photo: ApiResponseData<ApiUploadDataResponse> | null;
  post_comments: ApiResponseDataOnly<
    {
      id: number;
      attributes: ApiComment;
    }[]
  >;
  post_reacts: ApiResponseDataOnly<
    {
      id: number;
      attributes: ApiReact;
    }[]
  >;
}

export interface ApiResponseData<T = any> {
  data: {
    id: number;
    attributes: Omit<T, "id">;
  };
}

export interface ApiPaginated<T = any> {
  results: T;
  pagination: ApiPagination;
}

export interface ApiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
