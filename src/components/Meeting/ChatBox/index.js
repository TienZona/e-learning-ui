import styles from './ChatBox.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faUsers, faComments } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';

import ItemChat from '~/components/Meeting/ItemChat';
import ItemUser from '../ItemUser';

const cx = classNames.bind(styles);

function ChatBox() {
    const [theme, setTheme] = useState(true);

    const inputValue = useRef();
    const [listChat, setListChat] = useState([]);
    const [chat, setChat] = useState('');

    const [listUser, setListUser] = useState([
        {
            avatar: 'https://cdn.dribbble.com/users/1044993/screenshots/6187369/media/003ab0d70b4391716fdce14bf57bf2a7.png?compress=1&resize=400x300',
            name: 'TienZona',
            email: 'tienzona001@gmail.com'
        },
        {
            avatar: 'https://cdn.dribbble.com/users/1044993/screenshots/6187369/media/003ab0d70b4391716fdce14bf57bf2a7.png?compress=1&resize=400x300',
            name: 'TienZona',
            email: 'tienzona001@gmail.com'
        },
        {
            avatar: 'https://cdn.dribbble.com/users/1044993/screenshots/6187369/media/003ab0d70b4391716fdce14bf57bf2a7.png?compress=1&resize=400x300',
            name: 'TienZona',
            email: 'tienzona001@gmail.com'
        },
        {
            avatar: 'https://cdn.dribbble.com/users/1044993/screenshots/6187369/media/003ab0d70b4391716fdce14bf57bf2a7.png?compress=1&resize=400x300',
            name: 'TienZona',
            email: 'tienzona001@gmail.com'
        },
        {
            avatar: 'https://cdn.dribbble.com/users/1044993/screenshots/6187369/media/003ab0d70b4391716fdce14bf57bf2a7.png?compress=1&resize=400x300',
            name: 'TienZona',
            email: 'tienzona001@gmail.com'
        },
        {
            avatar: 'https://cdn.dribbble.com/users/1044993/screenshots/6187369/media/003ab0d70b4391716fdce14bf57bf2a7.png?compress=1&resize=400x300',
            name: 'TienZona',
            email: 'tienzona001@gmail.com'
        },
        {
            avatar: 'https://cdn.dribbble.com/users/1044993/screenshots/6187369/media/003ab0d70b4391716fdce14bf57bf2a7.png?compress=1&resize=400x300',
            name: 'TienZona',
            email: 'tienzona001@gmail.com'
        },
        {
            avatar: 'https://cdn.dribbble.com/users/1044993/screenshots/6187369/media/003ab0d70b4391716fdce14bf57bf2a7.png?compress=1&resize=400x300',
            name: 'TienZona',
            email: 'tienzona001@gmail.com'
        },
    ]);

    useEffect(() => {
        if (chat) {
            setListChat([...listChat, chat]);
            inputValue.current.value = '';
        }
    }, [chat]);
    // useEffect(() => {
    //     setListUser([...listUser, {
    //         avatar: 'https://cdn.dribbble.com/users/1044993/screenshots/6187369/media/003ab0d70b4391716fdce14bf57bf2a7.png?compress=1&resize=400x300',
    //         name: 'TienZona'
    //     }])
    // }, [])

    const submitComment = () => {
        if (inputValue.current.value !== '') {
            setChat({
                avatar: 'https://cdn.dribbble.com/users/1044993/screenshots/6187369/media/003ab0d70b4391716fdce14bf57bf2a7.png?compress=1&resize=400x300',
                name: 'Chung Phat Tien',
                content: inputValue.current.value,
                time: '12:01',
            });
            inputValue.current.value = '';
            inputValue.current.focus();
        } else {
            inputValue.current.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            setChat({
                avatar: 'https://cdn.dribbble.com/users/1044993/screenshots/6187369/media/003ab0d70b4391716fdce14bf57bf2a7.png?compress=1&resize=400x300',
                name: 'Chung Phat Tien',
                content: e.target.value,
                time: '12:01',
            });
        }
    };

    return (
        <div className={cx('box-chat')}>
            <div className={cx('chat-header')}>
                <div className={cx('timer')}>
                    <span>12:00</span>
                </div>
                <div className={cx('is-land')}>{theme ? <span>Tin nhắn</span> : <span>Thành viên</span>}</div>
                <div className={cx('box-icon')} onClick={() => setTheme(!theme)}>
                    {theme ? (
                        <div>
                            <FontAwesomeIcon icon={faUsers} />
                            <span>{listUser.length}</span>
                        </div>
                    ) : (
                        <div>
                            <span>{listChat.length}</span>
                            <FontAwesomeIcon icon={faComments} />
                        </div>
                    )}
                </div>
            </div>
            {theme ? (
                <div className={cx('chat-content')}>
                    {listChat.map((item, index) => (
                        <ItemChat
                            key={index}
                            avatar={item.avatar}
                            time={item.time}
                            name={item.name}
                            content={item.content}
                        />
                    ))}
                </div>
            ) : (
                <div className={cx('user-content')}>
                    {listUser.map((item, index) => (
                        <ItemUser key={index} user={item} />
                    ))}
                </div>
            )}

            <div className={cx('chat-footer')}>
                <img
                    className={cx('user-avatar')}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU"
                    alt=""
                />
                <div className={cx('chat-input')}>
                    <input
                        ref={inputValue}
                        type="text"
                        placeholder="Bạn muốn nói gì đó"
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <span />
                </div>
                <div className={cx('btn-send')} onClick={() => submitComment()}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
