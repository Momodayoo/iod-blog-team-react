import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { getInitialTheme } from './utils/theme'
import App from './App.jsx'
import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

let currentTheme = getInitialTheme() === 'light' ? lightTheme : darkTheme;
currentTheme = responsiveFontSizes(currentTheme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={currentTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
