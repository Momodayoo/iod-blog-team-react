import { createContext, useReducer, useContext } from "react";
import { userReducer, initialState } from "./userReducer";
import { getUsers, deleteUser, getUser, createUser, updateUser } from "./UserActions";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const value = { state, dispatch };
  return (
    <UserContext.Provider value={{ value }}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { UserProvider, useUser, getUsers, deleteUser, getUser, createUser, updateUser }
