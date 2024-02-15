import { ThemeModeContext } from "../ThemeModeContext";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from "react";


const ThemeSwitch = () => {
  const { themeMode, toggleThemeMode } = useContext(ThemeModeContext);

  const toggleTheme = () => {
    toggleThemeMode();
  };

  return (
    <IconButton onClick={toggleTheme}>
      {themeMode === "light" ? <Brightness4Icon />  : <Brightness7Icon /> }
    </IconButton>
  );
};

export default ThemeSwitch;
