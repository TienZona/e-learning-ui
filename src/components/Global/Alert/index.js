import styles from './Alert.module.scss';
import classNames from 'classnames/bind';
import { Alert as AlertAnt } from 'antd';

const cx = classNames.bind(styles);

function Alert({ type, message }) {
    return (
        <div className={cx('alert')}>
            {(type === 'success' && <AlertAnt as Alert showIcon message={message} type="success" />) ||
                (type === 'info' && <AlertAnt as Alert showIcon message={message} type="success" />) ||
                (type === 'warning' && <AlertAnt as Alert showIcon message={message} type="success" />) ||
                (type === 'error' && <AlertAnt as Alert showIcon message={message} type="success" />)}
        </div>
    );
}

export default Alert;
