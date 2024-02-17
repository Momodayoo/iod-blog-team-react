import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider } from "./components/ThemeModeContext";
import ThemeProvider from './components/ThemeProvider';
import { UserProvider } from './features/UserManager/UserContext.jsx';
import { AuthProvider } from './features/AuthManager/AuthContext.jsx';
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
        <AuthProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </ThemeModeProvider>
  </React.StrictMode>,
)
