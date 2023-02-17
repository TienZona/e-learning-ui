const initialState = {
    userID: '',
    name: '',
    email: '',
    avatar: '',
    peerID: '',
    stream: [],
    audio: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_AUTH': {
            return {
                ...state,
                userID: action.payload.userID,
                name: action.payload.name,
                email: action.payload.email,
                avatar: action.payload.avatar,
                peerID: action.payload.peerID,
                stream: action.payload.stream,
                audio: action.payload.audio,
            };
        }
        default:
            return state;
    }
};
export default authReducer;
