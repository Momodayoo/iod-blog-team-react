export const initialState = {
    users: [],
    currentUser: null,
    selectedUser: null,
    loading: false,
    itemLoading: false,
    error: null,
    itemError: null,
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
        case "FETCH_USER_REQUEST":
            return {
                ...state,
                itemLoading: true,
                itemError: null,
            };
        case "FETCH_USER_SUCCESS":
            return {
                ...state,
                currentUser: action.payload,
                itemLoading: false,
            };
        case "FETCH_USER_FAILURE":
            return {
                ...state,
                itemError: action.payload,
                itemLoading: false,
            };
        case "SELECT_USER":
            return {
                ...state,
                selectedUser: action.payload,
            };
        case "CREATE_USER_REQUEST":
            return {
                ...state,
                itemError: null,
                itemLoading: true,
            };
        case "CREATE_USER_SUCCESS":
            return {
                ...state,
                users: [...state.users, action.payload],
                itemLoading: false,
            };
        case "CREATE_USER_FAILURE":
            return {
                ...state,
                itemError: action.payload,
                itemLoading: false,
            };
        case "UPDATE_USER_REQUEST":
            return {
                ...state,
                itemError: null,
                itemLoading: true,
            };
        case "UPDATE_USER_SUCCESS":
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
                itemLoading: false,
            };
        case "UPDATE_USER_FAILURE":
            return {
                ...state,
                itemError: action.payload,
                itemLoading: false,
            };
        case "DELETE_USER_REQUEST":
            return {
                ...state,
                itemError: null,
                itemLoading: true,
            };
        case "DELETE_USER_SUCCESS":
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
                itemLoading: false,
            };
        case "DELETE_USER_FAILURE":
            return {
                ...state,
                itemError: action.payload,
                itemLoading: false,
            };
        default:
            return state;
    }
}
