import {
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import useStatePersist from "../hooks/useStatePersist";
import { stateReseted } from "./utils";
import {
  initialState,
  THEME_KEY_IN_LOCALSTORAGE,
  App,
  IUserFormSigninData,
  SIGNUP_KEY_IN_LOCALSTORAGE,
  IUserLoggedData,
  USER_COOKIE_KEY,
} from "./App.store";

import { setCookie, destroyCookie } from "nookies";

export const reducers: ValidateSliceCaseReducers<
  App,
  SliceCaseReducers<App>
> = {
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
  setSignUpData(state, action: PayloadAction<Partial<IUserFormSigninData>>) {
    Object.assign(state.signupData, action.payload);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { save } = useStatePersist<Partial<IUserFormSigninData>>(
      SIGNUP_KEY_IN_LOCALSTORAGE
    );
    save(state.signupData);
  },
  setUserLoggedData(state, action: PayloadAction<IUserLoggedData>) {
    state.userLoggedData = action.payload;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (state.userLoggedData) {
      setCookie(null, USER_COOKIE_KEY, JSON.stringify(state.userLoggedData), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
  },
  logout(state) {
    state.userLoggedData = {} as IUserLoggedData;
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
};
