import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faBrain, faUsersBetweenLines } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Navbar({active, setActive}) {

    return (
        <div className={cx('wrap')}>
            <div className={cx('list')}>
                <div className={cx('item', active === 'news' && 'active')} onClick={() => setActive('news')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faHome} />
                    <h3>Bảng tin</h3>
                    <span></span>
                </div>
                <div className={cx('item', active === 'calendar' && 'active')} onClick={() => setActive('calendar')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faCalendar} />
                    <h3>Lịch học</h3>
                    <span></span>
                </div>
                <div className={cx('item', active === 'exercise' && 'active')} onClick={() => setActive('exercise')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faBrain} />
                    <h3>Bài tập</h3>
                    <span></span>
                </div>
                <div className={cx('item', active === 'member' && 'active')} onClick={() => setActive('member')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faUsersBetweenLines} />
                    <h3>Thành viên</h3>
                    <span></span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
