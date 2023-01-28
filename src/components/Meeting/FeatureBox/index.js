import classNames from 'classnames/bind';
import styles from './FeatureBox.module.scss';

const cx = classNames.bind(styles);

function FeatureBox() {
    return (
        <div className={cx('container')}>
            <div className={cx('nav-tool')}>nav tool</div>
            <div className={cx('content')}>content</div>
        </div>
    );
}

export default FeatureBox;
