import { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "./authReducer";
import { login, logout } from "./AuthActions";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const value = { state, dispatch };
    return (
        <AuthContext.Provider value={{ value }}>{children}</AuthContext.Provider>
    );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth, login, logout };
