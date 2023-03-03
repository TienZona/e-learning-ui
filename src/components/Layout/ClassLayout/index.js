import classNames from 'classnames/bind';
import NavBar from '../componenets/NavBar';
import styles from './Class.module.scss';


const cx = classNames.bind(styles);

function ClassLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <NavBar />
           <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default ClassLayout;
