const initialState = {
    username: '',
};

const userNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USERNAME': {
            return {
                ...state,
                username: action.payload,
            };
        }
        default:
            return state;
    }
};
export default userNameReducer;
