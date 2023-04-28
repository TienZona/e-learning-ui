import styles from './ChatBox.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faUsers, faComments } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from '~/redux/actions/chat';

import ItemChat from '~/components/Meeting/ItemChat';
import ItemUser from '../ItemUser';

const cx = classNames.bind(styles);

function ChatBox({ socket, username, room }) {
    // redux
    const auth = useSelector((state) => state.auth);
    const users = useSelector((state) => state.user.list);
    const listMessage = useSelector((state) => state.chat.list);
    const [currentMessage, setCurrentMessage] = useState('');
    const dispatch = useDispatch();
    // hook
    const [theme, setTheme] = useState(true);
    const messagesEndRef = useRef(null);
    const [timer, setTimer] = useState(new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes('00'));
    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                avatar: auth.avatar,
                name: auth.name,
                email: auth.email,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            };
            await socket.emit('send_message', messageData);
            setCurrentMessage('');
        }
    };

    useEffect(() => {
        const interval = setInterval(
            () => setTimer(new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()),
            10000,
        );
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            dispatch(addChat(data));
        });
    }, [socket]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [listMessage]);

    return (
        <div className={cx('box-chat')}>
            <div className={cx('chat-header')}>
                <div className={cx('timer')}>
                    <span>{timer}</span>
                </div>
                <div className={cx('is-land')}>{theme ? <span>Tin Nhắn</span> : <span>Thành Viên</span>}</div>
                <div className={cx('box-icon')} onClick={() => setTheme(!theme)}>
                    {theme ? (
                        <div>
                            <FontAwesomeIcon icon={faUsers} />
                            <span>{users.length}</span>
                        </div>
                    ) : (
                        <div>
                            <span>{listMessage.length}</span>
                            <FontAwesomeIcon icon={faComments} />
                        </div>
                    )}
                </div>
            </div>
            {theme ? (
                <div className={cx('chat-content')} key={listMessage.id} {...listMessage}>
                    {listMessage.map((item, index) => (
                        <ItemChat
                            key={index}
                            avatar={item.avatar}
                            name={item.name}
                            time={item.time}
                            content={item.message}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            ) : (
                <div className={cx('user-content')}>
                    {users.map((item, index) => (
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
                        value={currentMessage}
                        type="text"
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') sendMessage();
                        }}
                        placeholder="Bạn muốn nói gì đó"
                    />
                    <span />
                </div>
                <div className={cx('btn-send')} onClick={() => sendMessage()}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
