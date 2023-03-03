import classNames from 'classnames/bind';
import styles from './Meet.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Meet() {
    const auth = useSelector((state) => state.auth);
    const [inputValue, setInputValue] = useState('');

    const getDayName = (dayIndex) => {
        let daysArray = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];
        return daysArray[dayIndex - 1];
    };

    const handleNavigator = () => {
        window.location.href = `/meeting/${inputValue}`;
    };

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
            <div className={cx('container') + ' container grid grid-cols-12 gap-4'}>
                <div className={cx('content-left') + ' col-span-6'}>
                    <div className={cx('timestamp')}>
                        <h3>
                            {getDayName(new Date().getDay()) +
                                ', ' +
                                new Date().getDate() +
                                ' thg ' +
                                (new Date().getMonth() + 1) +
                                ', ' +
                                new Date().getFullYear()}
                        </h3>
                    </div>
                    <div className={cx('slide-3')}>
                        <h3> Hi! {auth.name}</h3>
                        <Link to={'/meeting/' + uuid()} relative="path">
                            <button className={cx('button')}>
                                <FontAwesomeIcon icon={faVideo} className={cx('icon')} />
                                Tạo cuộc họp
                            </button>
                        </Link>

                        <div className={cx('input-name')}>
                            <input
                                type="text"
                                placeholder="Nhập ID phòng họp mặt"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <Link to={'/meeting/' + inputValue} relative="path" className={cx('btn')}>
                                <button>Tham gia</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('content-right') + ' col-span-6'}>
                    <img
                        src="https://myviewboard.com/blog/wp-content/uploads/2020/08/MP0027-01-scaled.jpg"
                        alt=""
                        className={cx('img')}
                    />
                    <h2>Hãy nhớ kiểm tra micro và camera khi vào phòng họp nhé!</h2>
                </div>
            </div>
        </div>
    );
}

export default Meet;
