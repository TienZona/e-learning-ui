const initialState = {
    id: '',
    username: '',
    email: '',
    avatar: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_AUTH': {
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                avatar: action.payload.avatar,
            };
        }
        default:
            return state;
    }
};
export default authReducer;
