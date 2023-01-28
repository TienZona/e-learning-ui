import classNames from 'classnames/bind';
import NavBar from '../componenets/NavBar';
import styles from './Meeting.module.scss';


const cx = classNames.bind(styles);

function MeetingLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <NavBar />
           <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default MeetingLayout;
