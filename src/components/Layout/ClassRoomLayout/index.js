import classNames from 'classnames/bind';
import styles from './ClassRoom.module.scss';


const cx = classNames.bind(styles);

function ClassRoomLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
           <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default ClassRoomLayout;
