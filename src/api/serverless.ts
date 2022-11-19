import axios from "axios";
import { parseCookies } from "nookies";

const token = parseCookies().token;

const serverless = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

export { serverless };
