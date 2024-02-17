const getUsers = async (dispatch) => {
  dispatch({ type: "FETCH_USERS_REQUEST" });
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
    const data = await response.json();
    switch (data.result) {
      case 200:
        dispatch({ type: "FETCH_USERS_SUCCESS", payload: data.data });
        break;
      case 404:
        dispatch({
          type: "FETCH_USERS_FAILURE",
          payload: "Endpoint not found",
        });
        break;
      case 500:
        dispatch({ type: "FETCH_USERS_FAILURE", payload: data.message });
        break;
      default:
        dispatch({
          type: "FETCH_USERS_FAILURE",
          payload: "Something went wrong. Please try again later.",
        });
        break;
    }
  } catch (error) {
    console.error("Error fetching users", error);
    dispatch({
      type: "FETCH_USERS_FAILURE",
      payload: "Something went wrong. Please try again later.",
    });
  }
};

const getUser = async (dispatch, id) => {
  dispatch({ type: "FETCH_USER_REQUEST" });
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`);
    const data = await response.json();
    if (data.result === 200) {
      // console.log(data);
      dispatch({ type: "FETCH_USER_SUCCESS", payload: data.data });
    } else {
      dispatch({
        type: "FETCH_USER_FAILURE",
        payload: "Something went wrong. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error fetching user", error);
    dispatch({
      type: "FETCH_USER_FAILURE",
      payload: "Something went wrong. Please try again later.",
    });
  }
};

const createUser = async (dispatch, user) => {
  dispatch({ type: "CREATE_USER_REQUEST" });
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      method: "POST",
      body: user,
    });
    const data = await response.json();
    if (data.result === 200) {
      dispatch({ type: "CREATE_USER_SUCCESS", payload: data.data });
    } else {
      dispatch({
        type: "CREATE_USER_FAILURE",
        payload: "Something went wrong. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error creating user", error);
    dispatch({
      type: "CREATE_USER_FAILURE",
      payload: "Something went wrong. Please try again later.",
    });
  }
};

const updateUser = async (dispatch, user) => {
  dispatch({ type: "UPDATE_USER_REQUEST" });
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.result === 200) {
      dispatch({ type: "UPDATE_USER_SUCCESS", payload: user });
    } else {
      dispatch({
        type: "UPDATE_USER_FAILURE",
        payload: "Something went wrong. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error updating user", error);
    dispatch({
      type: "UPDATE_USER_FAILURE",
      payload: "Something went wrong. Please try again later.",
    });
  }
};

const deleteUser = async (dispatch, id) => {
  const deleteUser = confirm("Are you sure you want to delete this user?");
  if (!deleteUser) {
    return false;
  }
  dispatch({ type: "DELETE_USER_REQUEST" });
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.result === 200) {
      dispatch({ type: "DELETE_USER_SUCCESS", payload: Number(id) });
    }
  } catch (error) {
    console.error("Error deleting user", error);
    dispatch({
      type: "DELETE_USER_FAILURE",
      payload: "Something went wrong. Please try again later.",
    });
  }
};

export { getUsers, deleteUser, getUser, createUser, updateUser };
