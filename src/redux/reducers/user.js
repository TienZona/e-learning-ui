const initialState = {
    list: [],
    selectedId: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER': {
            const newList = [...state.list];
            newList.push(action.payload);
            return {
                ...state,
                list: newList,
            };
        }

        case 'REMOVE_USER': {
            const newList = [...state.list];
            return {
                ...state,
                list: newList.filter((item) => item.socketID !== action.payload),
            };
        }

        case 'LIST_USER': {
            const newList = [...state.list];
            console.log(action.payload);

            return {
                ...state,
                list: action.payload,
            };
        }

        case 'SET_STREAM': {
            const newList = state.list.map((item) => {
                if (item.peerID === action.payload.userID) {
                    item.stream.push(action.payload.stream);
                }
                return item;
            });

            return {
                ...state,
                list: newList,
            };
        }

        case 'SET_AUDIO': {
            const newList = state.list.map((item) => {
                if (item.peerID === action.payload.userID) {
                    item.audio = action.payload.audio;
                }
                return item;
            });

            return {
                ...state,
                list: newList,
            };
        }

        case 'SET_CAMERA': {
            const newList = state.list.map((item) => {
                if (item.peerID === action.payload.userID) {
                    item.camera = action.payload.stream;
                }
                return item;
            });

            return {
                ...state,
                list: newList,
            };
        }

        case 'DELETE_CAMERA': {
            const newList = state.list.map((item) => {
                if (item.peerID === action.payload.userID) {
                    item.camera = null;
                }
                return item;
            });
            return {
                ...state,
                list: newList,
            };
        }

        case 'DELETE_STREAM': {
            const newList = state.list.map((item) => {
                if (item.peerID === action.payload.userID) {
                    item.stream = [];
                }
                return item;
            });
            return {
                ...state,
                list: newList,
            };
        }

        case 'REMOVE_LIST': {
            return {
                ...state,
                list: [],
            };
        }

        default:
            return state;
    }
};

export default userReducer;
