export const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
    loading: false,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
                loading: false,
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
            };
        default:
            return state;
    }
}