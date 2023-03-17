import classNames from 'classnames/bind';
import styles from './Class.module.scss';
import icon from '~/assets/icon/learnmore.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';
import Course from '~/components/ClassRoom/Course';
import { useState } from 'react';
import NewClass from '~/components/ClassRoom/NewClass';
import StudyClass from '~/components/ClassRoom/StudyClass';
import CreateClass from '~/components/ClassRoom/CreateClass';
import YourClass from '~/components/ClassRoom/YourClass';
const cx = classNames.bind(styles);

function Class() {
    const [active, setActive] = useState('newclass');

    const handleClick = () => {
        alert(1);
    };

    return (
        <div className="container">
            <div className={cx('header')}>
                <div className={cx('icon')}>
                    <img src={icon} alt="Anh" />
                </div>
                <div className={cx('search')}>
                    <input type="text" placeholder="Tìm kiếm lớp học" />
                    <button onClick={() => handleClick()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <div>
                    <button className={cx('btn-bell')}>
                        <FontAwesomeIcon icon={faBell} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-2">
                    <div className={cx('left')}>
                        <div className={cx('navbar')}>
                            <div
                                className={cx('nav-item', active === 'newclass' && 'active')}
                                onClick={() => setActive('newclass')}
                            >
                                <span>Lớp học</span>
                            </div>

                            <div
                                className={cx('nav-item', active === 'studying' && 'active')}
                                onClick={() => setActive('studying')}
                            >
                                <span>Đang học</span>
                            </div>

                            <div
                                className={cx('nav-item', active === 'createclass' && 'active')}
                                onClick={() => setActive('createclass')}
                            >
                                <span>Tạo lớp học</span>
                            </div>
                            <div
                                className={cx('nav-item', active === 'yourclass' && 'active')}
                                onClick={() => setActive('yourclass')}
                            >
                                <span>Lớp của bạn</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-10">
                    <div className={cx('right')}>
                        <div className={cx('container')}>
                            <div className={cx('head')}></div>
                            <div className={cx('body')}>
                                {(active === 'newclass' && <NewClass />) ||
                                    (active === 'studying' && <StudyClass />) ||
                                    (active === 'createclass' && <CreateClass />) ||
                                    (active === 'yourclass' && <YourClass />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Class;
