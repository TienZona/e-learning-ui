import styles from './EndMeeting.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import IconPrevious from '~/assets/icon/previous1.png';

const cx = classNames.bind(styles);

function EndMeeting() {
    return (
        <div className={cx('wrap')}>
            <h1>Cuộc họp đã kết thúc</h1>
            <Link to="/meet">
                <button>
                    <img src={IconPrevious} alt="" />
                    <p className="mx-4">Quay lại màn hình chính</p>
                </button>
            </Link>
        </div>
    );
}

export default EndMeeting;
