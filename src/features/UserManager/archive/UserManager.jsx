import { useEffect, useReducer } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Grid from '@mui/material/Grid';
import Alert from "@mui/material/Alert";
import Loader from "../../components/Loader";
import { userReducer, initialState } from "./userReducer";

const UserManager = () => {
    const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_USERS_REQUEST" });
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
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
        // TODO: handle all the possible responses
      }).catch((error) => {
        console.error("Error fetching users", error);
        dispatch({ type: "FETCH_USERS_FAILURE", payload: "Something went wrong. Please try again later." });
      }).finally(() => {
        //;
      }
    );
  }, []);

  const UserList = () => {
    const handleListItemClick = (event) => {
      event.preventDefault();
      const id = event.currentTarget.dataset.id;
      dispatch({ type: "SELECT_USER", payload: id });
    };

    const deleteUser = (event) => {
      const deleteUser = confirm("Are you sure you want to delete this user?");
      if (!deleteUser) {
        return false;
      }
      dispatch({ type: "DELETE_USER_REQUEST" });
      const id = event.currentTarget.dataset.id;
      fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.result === 200) {
            dispatch({ type: "DELETE_USER_SUCCESS", payload: id });
          }
        }).catch((error) => {
          console.error("Error deleting user", error);
          dispatch({ type: "DELETE_USER_FAILURE", payload: "Something went wrong. Please try again later." });
        }).finally(() => {
          // setLoading(false);
        }
      );
      };



    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {state.users.map((user) => (
          <ListItemButton
            key={user.id}
            selected={state.selectedUser === user.id.toString()}
            onClick={handleListItemClick}
            data-id={user.id}
          >
            <ListItemText primary={user.name} secondary={user.email} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" data-id={user.id} onClick={deleteUser}>
                <DeleteIcon />
              </IconButton>
          </ListItemSecondaryAction>
          </ListItemButton>
        ))}
      </List>
    );
  };

  return (
    <>
      <Grid item xs={12} sm={6}> 
        {state.loading ? <Loader /> : <UserList />}
        {state.error && <Alert severity="error">This is an error Alert.</Alert>}
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
    </>
  );
};

export default UserManager;
