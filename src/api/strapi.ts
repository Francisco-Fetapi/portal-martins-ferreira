import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { ApiError } from "./interfaces";

const token = parseCookies().token;
const environment = {
  production: "https://portal-obadias-backend-strapi-production.up.railway.app",
  development: "http://localhost:1337",
};

const ACCOUNT_BLOCKED = "Your account has been blocked by an administrator";

export const STRAPI_URL =
  environment[process.env.NODE_ENV as keyof typeof environment];
// export const STRAPI_URL = environment.production;

const strapi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

strapi.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error: AxiosError) {
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
    }

    return response;
  },
  function (error: AxiosError<ApiError>) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    const message = error.response?.data.error.message;
    console.log(message);
    if (message === ACCOUNT_BLOCKED) {
      window.location.href = "/bloqueado";
    }
  }
);

export const PHOTO_URL_MAIN = "user_8cfe4b828b.jpg";

export { strapi };
