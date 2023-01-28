import classNames from 'classnames/bind';
import styles from './AuthLayout.module.scss';

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            {children}
        </div>
    );
}

export default AuthLayout;
