import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Grid from '@mui/material/Grid';
import Alert from "@mui/material/Alert";
import Loader from "../../components/Loader";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        switch (data.result) {
          case 200:
            setUsers(data.data);
            break;
          case 404:
            setError("Endpoint not found");
            break;
          case 500:
            setError(data.message);
            break;
          default:
            setError("Something went wrong. Please try again later.");
            break;
        }
        // TODO: handle all the possible responses
      }).catch((error) => {
        console.error("Error fetching users", error);
        setError("Something went wrong. Please try again later.");
      }).finally(() => {
        setLoading(false);
      }
    );
  }, []);

  const UserList = () => {
    const handleListItemClick = (event) => {
      event.preventDefault();
      const id = event.currentTarget.dataset.id;
      setSelectedUser(id);
    };

    const deleteUser = (event) => {
      const deleteUser = confirm("Are you sure you want to delete this user?");
      if (!deleteUser) {
        return false;
      }
      setError(null);
      const id = event.currentTarget.dataset.id;
      fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.result === 200) {
            setUsers(users.filter((user) => user.id != parseInt(id)));
          }
        }).catch((error) => {
          console.error("Error deleting user", error);
          setError("Something went wrong. Please try again later.");
        }).finally(() => {
          // setLoading(false);
        }
      );
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
        {loading ? <Loader /> : <UserList />}
        {error && <Alert severity="error">This is an error Alert.</Alert>}
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
    </>
  );
};

export default UserManager;
