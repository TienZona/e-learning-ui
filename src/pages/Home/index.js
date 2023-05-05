import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import NavBar from '~/components/Layout/componenets/NavBar';

import bg2 from '~/assets/background/bg-2.jpg';
import bg4 from '~/assets/background/bg-4.jpg';
import bg5 from '~/assets/background/bg-5.jpg';
import meetingIcon from '~/assets/icon/meet.png';
import classroomIcon from '~/assets/icon/classroom.png';
import AvatarCircle from '~/components/Global/AvatarCircle';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
    document.title = 'Trang chủ';
    const [time, setTime] = useState(bg2);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const timer = setInterval(() => {
            switch (time) {
                case bg2:
                    setTime(bg4);
                    break;
                case bg4:
                    setTime(bg5);
                    break;
                case bg5:
                    setTime(bg2);
                    break;
                default:
                    setTime(bg2);
            }
        }, 5000);

        return () => {
            clearInterval(timer);
            document.body.style.overflowY = 'scroll';
        };
    }, [time]);

    return (
        <div
            className={cx('bg')}
            style={{ backgroundImage: `url(${time})`, height: `${window.innerHeight}px`, width: 'auto' }}
        >
            <NavBar />
            <div className={cx('container')}>
                <div className="font-mono flex items-center">
                    <div>
                        <h1 className="text-4xl text-yellow-400 font-mono mb-6">Welcome! {auth.name}</h1>
                        <h1 className="flex text-3xl text-lime-100 font-mono justify-end items-center">
                            Đến với <span className="mx-3 text-4xl text-lime-200 font-mono">learnmore</span>
                        </h1>
                    </div>
                    <div className="mx-3">
                        <AvatarCircle avatar={auth.avatar} size="60px" border="" />
                    </div>
                </div>
                <div className="font-sans text-5xl ">
                    <div className="flex justify-evenly">
                        <Link to="/classroom">
                            <div className={cx('item')}>
                                <img src={classroomIcon} width={'80px'} alt="" />
                                <h1 className="mt-5">Lớp học</h1>
                            </div>
                        </Link>
                        <Link to="/meet">
                            <div className={cx('item')}>
                                <img src={meetingIcon} width={'80px'} alt="" />
                                <h1 className="mt-5">Cuộc họp</h1>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
