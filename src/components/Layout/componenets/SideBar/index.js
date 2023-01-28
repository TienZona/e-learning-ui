import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faVideo } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SideBar() {
    return <div className={cx('container')}>
        <div className={cx('item','active') }>
            <FontAwesomeIcon className={cx('icon')} icon={faVideo} />
            <span>Meeting</span>
        </div>
        <div className={cx('item')}>
            <FontAwesomeIcon className={cx('icon')} icon={faGraduationCap} />
            <span>Class</span>
        </div>
    </div>;
}

export default SideBar;
