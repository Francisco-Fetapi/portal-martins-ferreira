import { ApiUploadDataResponse } from "../api/interfaces";
import { STRAPI_URL } from "../api/strapi";

type Sizes = "large" | "medium" | "small";

export default function getPhoto(photo: ApiUploadDataResponse, size?: Sizes) {
  //   return size + "_"+photo;
  let photoURL = photo.hash + photo.ext;
  if (size) {
    if (photo.formats) {
      if (photo.formats[size]) {
        photoURL = `${size}_${photoURL}`;
      }
    }
  }
  photoURL = STRAPI_URL + "/uploads/" + photoURL;

  return photoURL;
}
