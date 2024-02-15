import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUser, getUser, deleteUser } from "../../UserContext";
import Loader from "../../../../components/Loader";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const UserDetail = () => {
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
    fetchData();
  }, [dispatch, id]);

  const handleDelete = async () => {
    await deleteUser(dispatch, id);
    navigate("/users");
  };

  return itemLoading ? (
    <Loader />
  ) : itemError ? (
    <Alert severity="error" message={itemError} />
  ) : (
    <div>
      <img src={`http://localhost:3000/uploads/${currentUser ? currentUser.avatar : ""}`} alt={currentUser ? currentUser.name : ""} className="user-img"/>
      <h1>{currentUser ? currentUser.name : ""}</h1>
      <p>{currentUser ? currentUser.email : ""}</p>
      <Link to={`/users/${id}/edit`}>
        <Button variant="outlined">Edit</Button>
      </Link>
      <Button variant="outlined" color="error" sx={{ marginLeft: 2 }} onClick={handleDelete}>Delete</Button>
    </div>

  );
};

export default UserDetail;
