import classNames from 'classnames/bind';
import styles from './Meeting.module.scss';


const cx = classNames.bind(styles);

function MeetingLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
           <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default MeetingLayout;
