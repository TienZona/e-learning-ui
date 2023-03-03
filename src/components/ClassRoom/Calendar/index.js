import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';

const cx = classNames.bind(styles);

function Calendar() {
    return <div className={cx('wrap')}></div>;
}

export default Calendar;
