import { useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useUser, getUsers } from "./UserContext";

const UserManager = () => {
  const {
    state: { users, selectedUser, loading, error },
    dispatch,
  } = useUser().value;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      getUsers(dispatch);
    }
    fetchData();
  }, [dispatch]);

  const UserList = () => {
    const handleListItemClick = (event) => {
      event.preventDefault();
      const id = event.currentTarget.dataset.id;
      dispatch({ type: "SELECT_USER", payload: id });
      navigate(`/users/${id}`);
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
          </ListItemButton>
        ))}
      </List>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        {loading ? <Loader /> : <UserList />}
        {error && <Alert severity="error">This is an error Alert.</Alert>}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default UserManager;
