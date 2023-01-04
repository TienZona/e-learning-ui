import classNames from 'classnames/bind';
import styles from './Default.module.scss';

import { Header, Footer } from '~/components/Layout';

const cx = classNames.bind(styles);

function Default({ children }) {
    return (
        <div className={cx('wrapper') + ''}>
            <Header />
            <div className={cx('container') + ' md:container md:mx-auto' }>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default Default;
