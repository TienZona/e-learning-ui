export const getTime = (day) => {
    const date = new Date(day);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
};

export const formatTime = (day) => {
    const date = new Date(day);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
}

export const formatDateNotYear = (day) => {
    const date = new Date(day);
    // 1 thg 3
    return date.getDate() + ' thg ' + (date.getMonth() + 1);
}

export const getFormatDate = (day) => {
    const date = new Date(day);
    // 1 thg 3, 2023
    return date.getDate() + ' thg ' + (date.getMonth() + 1) + ', ' + date.getFullYear();
};


export const getFormatday = (day) => {
    const date = new Date(day);
    let name = '';
    switch (date.getDay()) {
       case 1: name = 'Thứ hai'; break;
       case 2: name = 'Thứ ba'; break;
       case 3: name = 'Thứ tư'; break;
       case 4: name = 'Thứ năm'; break;
       case 5: name = 'Thứ sáu'; break;
       case 6: name = 'Thứ bảy'; break;
       case 7: name = 'Chủ nhật'; break;
       default: name = '';
    }
    return name;
};
