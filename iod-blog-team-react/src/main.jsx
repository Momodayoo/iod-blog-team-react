import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider } from "./components/ThemeModeContext";
import ThemeProvider from './components/ThemeProvider';
import App from './App.jsx'
import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeModeProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ThemeModeProvider>
  </React.StrictMode>,
)
