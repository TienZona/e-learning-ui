export const addUser = (user) => {
    return {
        type: 'ADD_USER',
        payload: user
    }
}

export const addListUser = (users) => {
    return {
        type: 'LIST_USER',
        payload: users
    }
}


export const setStream = (userID, stream) => {
    return {
        type: 'SET_STREAM',
        payload: {
            userID,
            stream
        }
    }
}

export const removeList = () => {
    return {
        type: 'REMOVE_LIST',
        payload: null
    }
}