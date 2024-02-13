export const initialState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
    };

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_USERS_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "FETCH_USERS_SUCCESS":
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case "FETCH_USERS_FAILURE":
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case "SELECT_USER":
            return {
                ...state,
                selectedUser: action.payload,
            };
        case "DELETE_USER_REQUEST":
            return {
                ...state,
                error: null,
            };
        case "DELETE_USER_SUCCESS":
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
            };
        case "DELETE_USER_FAILURE":
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}