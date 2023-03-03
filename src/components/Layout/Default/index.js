import classNames from 'classnames/bind';
import styles from './Default.module.scss';

import NavBar from '../componenets/NavBar';

const cx = classNames.bind(styles);

function Default({ children }) {
    return (
        <div className={cx('wrapper') + ''}>
            <div className={cx('container') + ' md:container md:mx-auto' }>
                <NavBar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default Default;
