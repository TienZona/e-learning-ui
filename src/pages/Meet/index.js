import classNames from 'classnames/bind';
import styles from './Meet.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addAuth } from '~/redux/actions/auth';

const cx = classNames.bind(styles);

function Meet() {
    const username = useSelector((state) => state.auth.name);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const submit = (e) => {
        const user = {
            userID: Date.now(),
            name: name,
            email: 'demo@gmail.com',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            peerID: '',
            stream: [],
            audio: null,
        };
        dispatch(addAuth(user));
        setName('');
    };

    useEffect(() => {
        console.log(username);
    }, [username]);

    return (
        <div className={cx('')}>
            <header className={cx('header')}>
                <div className="container">
                    <h1>Tạo một cuộc họp ngay</h1>
                    <div>
                        <h3>MEETING</h3>
                        <img src="https://cdn-icons-png.flaticon.com/512/7185/7185630.png" alt="" />
                    </div>
                </div>
            </header>
            <div className={cx('container') + ' container'}>
                <div className={cx('slide')}>
                    {!username ? (
                        <div className={cx('slide-2')}>
                            <h3>TÊN BẠN LÀ</h3>
                            <div className={cx('input-name')}>
                                <input
                                    type="text"
                                    placeholder="Nhập tên gọi của bạn"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') submit();
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={cx('slide-3')}>
                            <h3> Hii! {username}</h3>
                            <Link to={'/meeting/' + uuid()} relative="path">
                                <button>Tạo cuộc họp </button>
                            </Link>

                            <div className={cx('input-name')}>
                                <input
                                    type="text"
                                    placeholder="Nhập ID ROOM"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <Link to={'/meeting/'+ inputValue} relative="path">
                                    <button>Join</button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Meet;
