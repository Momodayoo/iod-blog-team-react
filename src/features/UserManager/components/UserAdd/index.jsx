import { useUser, createUser } from "../../UserContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Loader from "../../../../components/Loader";
import Alert from "@mui/material/Alert";

const UserAdd = () => {
  const { state: {itemError, itemLoading}, dispatch } = useUser().value;

  const addUser = async (event) => {
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
    //const data = new FormData(form);
    await createUser(dispatch, data);
  };

  return itemLoading ? (
    <Loader />
  ) : itemError ? (
    <Alert severity="error" message={itemError} />
  ) : (
    <form onSubmit={addUser}>
      <TextField
        fullWidth
        required
        id="name"
        name="name"
        label="Required"
        placeholder="Please enter your full name"
        margin="normal"
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
      />
      <Button type="submit" variant="outlined">
        Add user
      </Button>
    </form>
  );
};

export default UserAdd;
