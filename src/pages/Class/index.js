import classNames from 'classnames/bind';
import styles from './Class.module.scss';
import icon from '~/assets/icon/learnmore.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';
import Course from '~/components/ClassRoom/Course';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Class() {
    const [active, setActive] = useState('newclass');

    const listCourse = [
        {
            title: 'LUYỆN THI CẤP TỐC 9+ TOÁN',
            category: 'Toán',
            content: 'Chinh phục 9+ trong 60 ngày với lộ trình đầy đủ',
            member: 15,
            color: ['#FAC945', '#f1e2a3'],
            author: {
                name: 'Chung Phat Tien B1910000',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ1iRTj6T6YjXYc1ERmF222dbfha7uZTiylu2AIQyN8tslI_4hs_BVKuteIZz3Qb0_clA&usqp=CAU',
            },
        },
        {
            title: 'LUYỆN THI ĐẠI HỌC 8+ HÓA',
            category: 'HÓA HỌC',
            content: 'Khóa ôn tập hóa học từ cơ bản đến 8+',
            member: 15,
            color: ['#fa45d3', ' #efb6e3'],
            author: {
                name: 'Chung Phat Tien B1910000',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ1iRTj6T6YjXYc1ERmF222dbfha7uZTiylu2AIQyN8tslI_4hs_BVKuteIZz3Qb0_clA&usqp=CAU',
            },
        },
        {
            title: 'HTML - CSS -JAVSCRIPT',
            category: 'Lập trình',
            content: 'Khóa học lập trình web cơ bản cho người mới học lập trình',
            member: 15,
            color: ['#454cfa', '#68fcb8'],
            author: {
                name: 'Chung Phat Tien B1910000',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ1iRTj6T6YjXYc1ERmF222dbfha7uZTiylu2AIQyN8tslI_4hs_BVKuteIZz3Qb0_clA&usqp=CAU',
            },
        },
        {
            title: 'HTML - CSS -JAVSCRIPT',
            category: 'Lập trình',
            content: 'Khóa học lập trình web cơ bản cho người mới học lập trình',
            member: 15,
            color: ['#12edbd', '#e2f9fc'],
            author: {
                name: 'Chung Phat Tien B1910000',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ1iRTj6T6YjXYc1ERmF222dbfha7uZTiylu2AIQyN8tslI_4hs_BVKuteIZz3Qb0_clA&usqp=CAU',
            },
        },
        {
            title: 'HTML - CSS -JAVSCRIPT',
            category: 'Lập trình',
            content: 'Khóa học lập trình web cơ bản cho người mới học lập trình',
            member: 15,
            color: ['#fa8145', '#FCE068'],
            author: {
                name: 'Chung Phat Tien B1910000',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ1iRTj6T6YjXYc1ERmF222dbfha7uZTiylu2AIQyN8tslI_4hs_BVKuteIZz3Qb0_clA&usqp=CAU',
            },
        },
        {
            title: 'HTML - CSS -JAVSCRIPT',
            category: 'Lập trình',
            content: 'Khóa học lập trình web cơ bản cho người mới học lập trình',
            member: 15,
            color: ['#77e747', '#f9ffa8'],
            author: {
                name: 'Chung Phat Tien B1910000',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ1iRTj6T6YjXYc1ERmF222dbfha7uZTiylu2AIQyN8tslI_4hs_BVKuteIZz3Qb0_clA&usqp=CAU',
            },
        },
        {
            title: 'HTML - CSS -JAVSCRIPT',
            category: 'Lập trình',
            content: 'Khóa học lập trình web cơ bản cho người mới học lập trình',
            member: 15,
            color: ['#a51aef', '#c395f1'],
            author: {
                name: 'Chung Phat Tien B1910000',
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ1iRTj6T6YjXYc1ERmF222dbfha7uZTiylu2AIQyN8tslI_4hs_BVKuteIZz3Qb0_clA&usqp=CAU',
            },
        },
    ];

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
                            <div
                                className={cx('nav-item', active === 'studying' && 'active')}
                                onClick={() => setActive('studying')}
                            >
                                <span>Đang học</span>
                            </div>
                            <div
                                className={cx('nav-item', active === 'newclass' && 'active')}
                                onClick={() => setActive('newclass')}
                            >
                                <span>Lớp học mới</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-10">
                    <div className={cx('right')}>
                        <div className={cx('container')}>
                            <div className={cx('head')}></div>
                            <div className={cx('body')}>
                                <div className={cx('new-class')}>
                                    <h1>Lớp học mới</h1>
                                </div>
                                <div className={cx('list-new ')}>
                                    <div className="grid grid-cols-3 gap-8">
                                        {listCourse.map((course, index) => (
                                            <div className="col-span-1" key={index}>
                                                <Course course={course} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Class;
