import classNames from 'classnames/bind';
import styles from './Header.module.scss';


const cx = classNames.bind(styles);

function Header() {
    return ( <header className={cx('header')}>
        <div className="md:container md:mx-auto">
            <h1>Header</h1>
        </div>
    </header> );
}

export default Header;