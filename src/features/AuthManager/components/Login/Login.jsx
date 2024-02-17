import { useAuth, login } from "../../AuthContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Loader from "../../../../components/Loader";
import Alert from "@mui/material/Alert";

const Login = () => {
  const {
    state: { loading, error },
    dispatch,
  } = useAuth().value;

    const loginUser = async (event) => {
        event.preventDefault();
    
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        await login(dispatch, email, password);
    };

    return (
        <form onSubmit={loginUser}>
            <TextField
                fullWidth
                required
                id="email"
                name="email"
                type="email"
                placeholder="Please enter your email address"
                margin="normal"
            />
            <TextField
                fullWidth
                required
                id="password"
                name="password"
                type="password"
                placeholder="Please enter your password"
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
            >
                Login
            </Button>
            {loading && <Loader />}
            {error && <Alert severity="error" message={error} />}
        </form>
    );        
};

export default Login;
