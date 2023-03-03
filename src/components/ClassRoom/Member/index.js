import classNames from 'classnames/bind';
import styles from './Member.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faUsers } from '@fortawesome/free-solid-svg-icons';
import AvatarCircle from '~/components/Global/AvatarCircle';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Member() {
    const generateColor = () => {
        return Math.random().toString(16).substr(-6);
    };

    const users = [
        {
            name: 'Chung Phat Tien B1910000 TienZona',
            avatar: '',
        },
        {
            name: 'Chung Phat Tien',
            avatar: '',
        },
        {
            name: 'Chung ',
            avatar: '',
        },
        {
            name: 'TienZona',
            avatar: '',
        },
        {
            name: 'Chung Phat ',
            avatar: '',
        },
    ];

    return (
        <div className={cx('wrap')}>
            <div className={cx('heading')}>
                <h1>Giáo viên</h1>
                <FontAwesomeIcon icon={faUserGraduate} />
            </div>
            <div className={cx('item')} style={{ backgroundColor: '#333' }}>
                <AvatarCircle size="50px" avatar="" border="red" />
                <div>
                    <h2>Chung Phat Tien B1910000</h2>
                    <span>tienb1910000@student.ctu.edu.vn</span>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className={cx('heading')}>
                    <h1>Học sinh</h1>
                    <FontAwesomeIcon icon={faUsers} />
                </div>
                <div className={cx('heading')}>
                    <h1>15</h1>
                    <FontAwesomeIcon icon={faUsers} />
                </div>
            </div>
            {users.map((user) => (
                <div className={cx('item')} style={{ backgroundColor: '#' + generateColor() }}>
                    <AvatarCircle size="50px" avatar="" border="red" />
                    <div>
                        <h2>Chung Phat Tien B1910000</h2>
                        <span>tienb1910000@student.ctu.edu.vn</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Member;
