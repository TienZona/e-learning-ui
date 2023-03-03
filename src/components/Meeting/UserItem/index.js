import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import styles from './UserItem.module.scss';

const cx = classNames.bind(styles);

function UserItem({ user, handleSelect }) {
    const [isVideoPlay, setVideoPlay] = useState(false);
    const [streamFirst, setStreamFirst] = useState(false);
    const [streamSecond, setStreamSecond] = useState(false);
    const videoTag = useRef(null);
    const audioTag = useRef(null);

    useEffect(() => {
        if (user.stream.length === 1) {
            setStreamFirst(true);
        }

        if(user.stream.length){
            setVideoPlay(true)
        }else{
            setVideoPlay(false)
        }   

        if (streamFirst) {
            videoTag.current.srcObject = null;
            videoTag.current.srcObject = user.stream[0];
            videoTag.current.play();
        }

        if (streamSecond) {
            videoTag.current.srcObject = null;
            videoTag.current.srcObject = user.stream[1];
            videoTag.current.play();
        }
    });

    useEffect(() => {
        if (user.audio) {
            audioTag.current.srcObject = user.audio;
            audioTag.current.play();
        }
    }, [user.audio]);

    const handleStream = (value) => {
        setStreamFirst(value);
        setStreamSecond(!value);
    };

    return (
        <div className={cx('user-item') + ' active'} onClick={() => handleSelect(user)}>
            <img className={cx('avatar')} src={user.avatar} alt="Anh meo" />
            <span className={cx('name')}>{user.name}</span>
            <div className={cx('frame-image')} style={{ display: isVideoPlay ? 'none' : '' }}>
                <div className={cx('frame-name')}>
                    <div className={cx('frame-avatar')}>
                        <img
                            src={user.avatar}
                            alt=""
                        />
                    </div>
                </div>
                <h1>{user.name}</h1>
            </div>
            <video ref={videoTag} src="" className={cx('video')}></video>
            <video ref={audioTag} src=""></video>
            <div className={cx('tool')}>
                {user.stream.length ? (
                    user.stream.length === 1 ? (
                        <div
                            className={cx('btn', streamFirst && 'active')}
                            onClick={() => {
                                handleStream(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faCirclePlay} />
                        </div>
                    ) : (
                        <>
                            <div
                                className={cx('btn', streamFirst && 'active')}
                                onClick={() => {
                                    handleStream(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faCirclePlay} />
                            </div>

                            <div
                                className={cx('btn', streamSecond && 'active')}
                                onClick={() => {
                                    handleStream(false);
                                }}
                            >
                                <FontAwesomeIcon icon={faCirclePlay} />
                            </div>
                        </>
                    )
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default UserItem;
