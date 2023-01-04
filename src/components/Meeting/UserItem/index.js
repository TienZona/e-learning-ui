import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styles from './UserItem.module.scss';

const cx = classNames.bind(styles);

function UserItem(props) {
    const [micro, setMicro] = useState(false);
    const [volume, setVolume] = useState(false);

    return (
        <div className={cx('user-item') + ' active'}>
            <img className={cx('avatar')} src={props.item.avatar} alt="Anh meo" />
            <span className={cx('name')}>{props.item.name}</span>
            <div className={cx('tool')}>
                <button className={cx('btn', micro || 'active')} onClick={() => setMicro(!micro)}>
                    <FontAwesomeIcon icon={micro ? faMicrophone : faMicrophoneSlash} />
                </button>
                <button className={cx('btn', volume || 'active')} onClick={() => setVolume(!volume)}>
                    <FontAwesomeIcon icon={volume ? faVolumeHigh : faVolumeXmark} />
                </button>
            </div>
        </div>
    );
}

export default UserItem;
