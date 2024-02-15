import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser, getUser, updateUser } from "../../UserContext";
import Loader from "../../../../components/Loader";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const UserEdit = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const id = urlParams.id;
  const {
    state: { currentUser, itemLoading, itemError },
    dispatch,
  } = useUser().value;

  useEffect(() => {
    async function fetchData() {
      await getUser(dispatch, id);
    }
    if (id) {
      fetchData();
    }
  }, [dispatch, id]);

  const updateCurrentUser = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formdata = new FormData(form);
    const data = Array.from(formdata.entries()).reduce(
      (memo, [key, value]) => ({
        ...memo,
        [key]: value,
      }),
      {}
    );
    data.id = currentUser.id;
    //const data = new FormData(form);
    await updateUser(dispatch, data);
    navigate(`/users/${id}`);
  };

  return itemLoading ? (
    <Loader />
  ) : itemError ? (
    <Alert severity="error" message={itemError} />
  ) : (
    <form onSubmit={updateCurrentUser}>
      <TextField
        fullWidth
        required
        id="name"
        name="name"
        label="Required"
        placeholder="Please enter your full name"
        margin="normal"
        defaultValue={currentUser ? currentUser.name : ""}
      />
      <TextField
        fullWidth
        required
        id="email"
        name="email"
        type="email"
        label="Required"
        placeholder="Please enter your email address"
        margin="normal"
        defaultValue={currentUser ? currentUser.email : ""}
      />
      <TextField
        fullWidth
        required
        id="password"
        name="password"
        type="password"
        label="Required"
        placeholder="Please enter your password"
        margin="normal"
        defaultValue={currentUser ? currentUser.password : ""}
      />
      <Button type="submit" variant="outlined">Update user</Button>
    </form>
  );
};

export default UserEdit;
