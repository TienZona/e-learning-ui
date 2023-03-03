import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';

import iconMeet from '~/assets/icon/meet.png';
import iconClassRoom from '~/assets/icon/classroom.png';
import iconUser from '~/assets/icon/user.png';

const cx = classNames.bind(styles);

function NavBar() {
    return (
        <div className={cx('box')}>
            <Link to="/home">
                <div className={cx('item', 'focus')}>
                    <img
                        src="https://noithattinnghia.com/wp-content/uploads/2019/03/cropped-icon-home-cam.png"
                        alt=""
                    />
                    <span>Home</span>
                </div>
            </Link>
            <div className={cx('navbar')}>
                <Link to="/meet">
                    <div className={cx('item')}>
                        <img src={iconMeet} alt="Meet" />
                        <span>Meet</span>
                    </div>
                </Link>

                <Link to="/classroom">
                    <div className={cx('item')}>
                        <img src={iconClassRoom} alt="class" />
                        <span>Class</span>
                    </div>
                </Link>
                <Link to="/account">
                    <div className={cx('item')}>
                        <img src={iconUser} alt="user" />
                        <span>Login</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
