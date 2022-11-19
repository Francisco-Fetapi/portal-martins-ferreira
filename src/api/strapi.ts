import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { USER_COOKIE_KEY } from "../store/App.store";

const token = parseCookies().token;

const strapi = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

strapi.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
  }
);
strapi.interceptors.response.use(
  function (response) {
    if (response.data.jwt) {
      const myToken = response.data.jwt;
      strapi.defaults.headers.Authorization = "Bearer " + myToken;
      console.log("Obti um jwt", myToken);
      setCookie(null, "token", myToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      if (response.data.user) {
        setCookie(null, USER_COOKIE_KEY, JSON.stringify(response.data.user), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      }
    }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
  }
);

export const PHOTO_URL_MAIN = "user_8cfe4b828b.jpg";

export { strapi };
