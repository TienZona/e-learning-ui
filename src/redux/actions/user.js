export const addUser = (user) => {
    return {
        type: 'ADD_USER',
        payload: user
    }
}

export const removeUser = (user) => {
    return {

        type: 'REMOVE_USER',
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

export const setAudio = (userID, audio) => {
    return {
        type: 'SET_AUDIO',
        payload: {
            userID,
            audio
        }
    }
}

export const deleteStream = (userID) => {
    return {
        type: 'DELETE_STREAM',
        payload: {
            userID
        }
    }
}

export const removeList = () => {
    return {
        type: 'REMOVE_LIST',
        payload: null
    }
}
