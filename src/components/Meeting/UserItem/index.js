import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';

import styles from './UserItem.module.scss';

const cx = classNames.bind(styles);

function UserItem({ user }) {
    const videoTag = useRef(null);

    useEffect(() => {
        if (user.stream) {
            // console.log('re-render')
            videoTag.current.srcObject = user.stream;
            videoTag.current.play();
        }
    });

    return (
        <div className={cx('user-item') + ' active'}>
            <img className={cx('avatar')} src={user.avatar} alt="Anh meo" />
            <span className={cx('name')}>{user.name}</span>
            <video ref={videoTag} src="" className={cx('video')}></video>
        </div>
    );
}

export default UserItem;
