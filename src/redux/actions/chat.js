export const addChat = (data) => {
    return {
        type: 'ADD_CHAT',
        payload: {
            room: data.room,
            avatar: data.avatar,
            name: data.name,
            email: data.email,
            message: data.message,
            time: data.time
        }
    }
}

export const removeChat = (data) => {
    return {
        type: 'REMOVE_CHAT',
        payload: null
    }
}