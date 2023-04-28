const initialState = {
    list: [],
    selectedId: null,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CHAT': {
            const newList = [...state.list];
            newList.push(action.payload);
            return {
                ...state,
                list: newList,
            };
        }
        case 'REMOVE_CHAT': {
            return {
                ...state,
                list: []
            }
        }
        default:
            return state;
    }
};
export default chatReducer;
