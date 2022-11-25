import { ApiResponseData } from "../api/interfaces";

export interface ResponseType {
  data: {
    id: number;
    attributes: object;
  };
}

export default function parserResponse<
  U,
  T extends ResponseType = ApiResponseData<U>
>(prop: T) {
  const { data } = prop;
  return {
    id: data.id,
    ...data.attributes,
  } as { id: number } & U;
}
