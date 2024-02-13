import { createContext, useReducer, useContext } from "react";
import { userReducer, initialState } from "./userReducer";

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

const getUsers = async (dispatch) => {
  dispatch({ type: "FETCH_USERS_REQUEST" });
  try {
    const response = await fetch("http://localhost:3000/api/users");
    const data = await response.json();
    console.log(data);
    switch (data.result) {
      case 200:
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: data.data });
        break;
      case 404:
        dispatch({ type: "FETCH_USERS_FAILURE", payload: "Endpoint not found" });
        break;
      case 500:
        dispatch({ type: "FETCH_USERS_FAILURE", payload: data.message });
        break;
      default:
        dispatch({ type: "FETCH_USERS_FAILURE", payload: "Something went wrong. Please try again later." });
        break;
    }
  } catch (error) {
    console.error("Error fetching users", error);
    dispatch({ type: "FETCH_USERS_FAILURE", payload: "Something went wrong. Please try again later." });
  }
};

const deleteUser = async (dispatch, id) => {
  const deleteUser = confirm("Are you sure you want to delete this user?");
  if (!deleteUser) {
    return false;
  }
  dispatch({ type: "DELETE_USER_REQUEST" });
  try {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    if (data.result === 200) {
      dispatch({ type: "DELETE_USER_SUCCESS", payload: id });
    }
  } catch (error) {
    console.error("Error deleting user", error);
    dispatch({ type: "DELETE_USER_FAILURE", payload: "Something went wrong. Please try again later." });
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export { UserProvider, useUser, getUsers, deleteUser }