import { createSlice } from "@reduxjs/toolkit";

const getInitialMode = () => {
  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode) {
    return savedDarkMode === "true";
  }

  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

const initialState = {
  darkMode: getInitialMode(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode.toString());

      if (state.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});
export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
