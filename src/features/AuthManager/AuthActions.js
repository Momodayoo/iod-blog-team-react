const login = async (dispatch, email, password) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data);
        if (data.result === 200) {
            dispatch({ type: "LOGIN_SUCCESS", payload: data.data });
        } else {
            dispatch({
                type: "LOGIN_FAILURE",
                payload: "Invalid email or password",
            });
        }
    }
    catch (error) {
        console.error("Error logging in", error);
        dispatch({
            type: "LOGIN_FAILURE",
            payload: "Something went wrong. Please try again later.",
        });
    }
}

const logout = (dispatch) => {
    dispatch({ type: "LOGOUT" });
}

export { login, logout };
