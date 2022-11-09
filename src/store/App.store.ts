import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/IUser";
import { reducers } from "./App.actions";

export const THEME_KEY_IN_LOCALSTORAGE = "darkMode";
export const SIGNUP_KEY_IN_LOCALSTORAGE = "signup-data";

export interface IDarkMode {
  darkMode: boolean;
}
export interface IUserFormSigninData extends IUser {
  password: IUser["password1"];
}
export interface App extends IDarkMode {
  signupData: Partial<IUserFormSigninData>;
}

export const initialState: App = {
  darkMode: false,
  signupData: {},
};

export function sliceCreator(initialState: App) {
  return createSlice({
    name: "app",
    initialState,
    reducers,
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

export const { toggleTheme, resetAllState, setSignUpData, setTheme } =
  app.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
