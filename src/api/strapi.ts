import axios from "axios";
import { parseCookies } from "nookies";

const token = parseCookies().token;

const strapi = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

export const PHOTO_URL_MAIN = "user_8cfe4b828b.jpg";

export { strapi };
