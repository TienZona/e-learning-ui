export const addChat = (data) => {
    return {
        type: 'ADD_CHAT',
        payload: {
            room: data.room,
            avatar: data.avatar,
            author: data.author,
            message: data.message,
            time: data.time
        }
    }
}