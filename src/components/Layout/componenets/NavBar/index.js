import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';

import iconMeet from '~/assets/icon/meet.png';
import iconClassRoom from '~/assets/icon/classroom.png';
import iconUser from '~/assets/icon/user.png';

const cx = classNames.bind(styles);

function NavBar() {
    return (
        <div className={cx('box')}>
            <div className={cx('item', 'focus')}>
                <img src="https://noithattinnghia.com/wp-content/uploads/2019/03/cropped-icon-home-cam.png" alt="" />
                <span>Home</span>
            </div>
            <div className={cx('navbar')}>
                <div className={cx('item')}>
                    <img src={iconMeet} alt="Meet" />
                    <span>Meet</span>
                </div>
                <div className={cx('item')}>
                    <img src={iconClassRoom} alt="class" />
                    <span>Class</span>
                </div>
                <div className={cx('item')}>
                    <img src={iconUser} alt="user" />
                    <span>User</span>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
