import UserManager from "../../features/UserManager";
import Grid from "@mui/material/Grid";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Users = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4">Users</Typography>
      </Grid>
      <Grid item xs={12} sm={6} container justifyContent={'flex-end'}>
        <Link to="/users/add">
          <Button variant="outlined" startIcon={<PersonAddAltIcon />}>
            Add User
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <UserManager />
      </Grid>
    </Grid>
  );
};

export default Users;
