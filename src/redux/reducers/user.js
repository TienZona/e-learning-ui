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

        case 'LIST_USER': {
            return {
                ...state,
                list: action.payload,
            };
        }

        case 'SET_STREAM': {
            const newList = state.list.map((item) => {
                if (item.peerID === action.payload.userID) {
                    item.stream = action.payload.stream;
                }
                return item;
            });

            return {
                ...state,
                list: newList,
            };
        }

        case 'REMOVE_LIST' : {
            return {
                ...state,
                list: []
            }
        }
        default:
            return state;
    }
};

export default userReducer;
