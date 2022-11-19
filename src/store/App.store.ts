import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IUser, IUserLogged } from "../interfaces/IUser";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import useStatePersist from "../hooks/useStatePersist";
import { stateReseted } from "./utils";

export const THEME_KEY_IN_LOCALSTORAGE = "darkMode";
export const SIGNUP_KEY_IN_LOCALSTORAGE = "signup-data";
export const USER_COOKIE_KEY = "user";
export interface IDarkMode {
  darkMode: boolean;
}
export interface IUserFormSigninData extends IUser {
  password: IUser["password1"];
}

export interface App extends IDarkMode {
  signupData: Partial<IUserFormSigninData>;
  userLoggedData: IUserLogged;
}

const cookies = parseCookies();
const userData = JSON.parse(cookies[USER_COOKIE_KEY] || "{}") as IUserLogged;

export const initialState: App = {
  darkMode: false,
  signupData: {},
  userLoggedData: userData,
};

export function sliceCreator(initialState: App) {
  return createSlice({
    name: "app",
    initialState,
    reducers: {
      toggleTheme(state) {
        state.darkMode = !state.darkMode;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { save } = useStatePersist<boolean>(THEME_KEY_IN_LOCALSTORAGE);
        save(state.darkMode);
      },
      setTheme(state, action: PayloadAction<boolean>) {
        state.darkMode = action.payload;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { save } = useStatePersist<boolean>(THEME_KEY_IN_LOCALSTORAGE);
        save(state.darkMode);
      },
      setSignUpData(
        state,
        action: PayloadAction<Partial<IUserFormSigninData>>
      ) {
        Object.assign(state.signupData, action.payload);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { save } = useStatePersist<Partial<IUserFormSigninData>>(
          SIGNUP_KEY_IN_LOCALSTORAGE
        );
        save(state.signupData);
      },
      setUserLoggedData(state, action: PayloadAction<IUserLogged>) {
        state.userLoggedData = action.payload;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if (state.userLoggedData) {
          setCookie(
            null,
            USER_COOKIE_KEY,
            JSON.stringify(state.userLoggedData),
            {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            }
          );
        }
      },
      logout(state) {
        state.userLoggedData = {} as IUserLogged;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        destroyCookie(null, USER_COOKIE_KEY);
      },
      resetAllState(state, action: PayloadAction<boolean>) {
        if (action.payload) {
          Object.assign(state, initialState);
          return;
        }
        Object.assign(state, stateReseted(initialState));
      },
    },
  });
}

export const app = sliceCreator(initialState);

export const middlewares = {
  serializableCheck: {
    // Ignore these paths in the state
    ignoredPaths: [],
  },
};

export const store = configureStore({
  reducer: {
    app: app.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(middlewares),
});

export default store;

export const {
  toggleTheme,
  setUserLoggedData,
  logout,
  resetAllState,
  setSignUpData,
  setTheme,
} = app.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
