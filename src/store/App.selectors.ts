import { RootState } from "./App.store";

export const selectTheme = (state: RootState) => state.app.darkMode;
export const selectSignupData = (state: RootState) => state.app.signupData;
