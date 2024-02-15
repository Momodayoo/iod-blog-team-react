import { getItem, setItem } from "./storage";

export const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const getInitialTheme = () => {
  let initialTheme = isDarkMode() ? "dark" : "light";
  if (getItem("blogTheme")) initialTheme = getItem("blogTheme");
  return initialTheme;
};

export const setTheme = (theme) => {
  // set css link href
  setItem("blogTheme", theme);
};
