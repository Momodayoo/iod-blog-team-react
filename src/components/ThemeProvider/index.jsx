import {
    ThemeProvider as MuiThemeProvider,
    createTheme,
    responsiveFontSizes,
  } from "@mui/material/styles";
  import { ThemeModeContext } from "../ThemeModeContext";
  import { useContext } from "react";
  
  let lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  
  lightTheme = responsiveFontSizes(lightTheme);
  
  let darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  
  darkTheme = responsiveFontSizes(darkTheme);
  
  const ThemeProvider = ({ children }) => {
    const themeMode = useContext(ThemeModeContext).themeMode;
    const theme = themeMode === "light" ? lightTheme : darkTheme;
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
  };
  
  export default ThemeProvider;
