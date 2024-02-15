import { useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Loader from "../../components/Loader";
import { useUser, getUsers, deleteUser } from "./UserContext";

const UserManager = () => {
  const {
    state: { users, selectedUser, loading, error },
    dispatch,
  } = useUser().value;

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const UserList = () => {
    const handleListItemClick = (event) => {
      event.preventDefault();
      const id = event.currentTarget.dataset.id;
      dispatch({ type: "SELECT_USER", payload: id });
    };

    const deleteUser = (event) => {
      const id = event.currentTarget.dataset.id;
      deleteUser(dispatch, id);
    };

    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {users.map((user) => (
          <ListItemButton
            key={user.id}
            selected={selectedUser === user.id.toString()}
            onClick={handleListItemClick}
            data-id={user.id}
          >
            <ListItemText primary={user.name} secondary={user.email} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                data-id={user.id}
                onClick={deleteUser}
              >
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
        {loading ? <Loader /> : <UserList />}
        {error && <Alert severity="error">This is an error Alert.</Alert>}
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
    </>
  );
};

export default UserManager;