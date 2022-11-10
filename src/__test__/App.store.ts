import { configureStore } from "@reduxjs/toolkit";
import { App, middlewares, sliceCreator,IUserLoggedData } from "../store/App.store";

const initialState: App = {
  darkMode: false,
  signupData: {},
  userLoggedData: {} as IUserLoggedData,
};

const app = sliceCreator(initialState);

export const store = configureStore({
  reducer: {
    app: app.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(middlewares),
});

export default store;
