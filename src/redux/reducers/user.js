const initialState = {
    list: [
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
            email: 'TienZona@gmail.com',
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
            email: 'TienZona@gmail.com',
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
            email: 'TienZona@gmail.com',
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
            email: 'TienZona@gmail.com',
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
            email: 'TienZona@gmail.com',
        },
    ],
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
        default:
            return state;
    }
};
export default userReducer;
