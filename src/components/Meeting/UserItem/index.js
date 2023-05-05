import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import styles from './UserItem.module.scss';
import { useDispatch } from 'react-redux';
import { deleteCamera } from '~/redux/actions/user';

const cx = classNames.bind(styles);

function UserItem({ user, handleSelect, socket }) {
    const [isVideoPlay, setVideoPlay] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [activeCamera, setActiveCamera] = useState(true);
    const videoTag = useRef(null);
    const audioTag = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('user-stop-stream', (id) => {
            dispatch(deleteCamera(id));
            if (user.peerID === id) {
                user.camera = null;
            }
        });
    }, [dispatch, socket, user]);

    useEffect(() => {
        if (user.audio) {
            audioTag.current.srcObject = user.audio;
            audioTag.current.play();
        }
    }, [user.audio]);

    useEffect(() => {
        if (user.camera) {
            openStream(true, user.camera);
        } else {
            setIsPlay(false);
        }
    }, [user.camera]);

    const openStream = (isStream, stream) => {
        if (isStream) {
            videoTag.current.srcObject = null;
            videoTag.current.srcObject = stream;
            videoTag.current.play();
            setIsPlay(true);
        } else {
            videoTag.current.srcObject = null;
            setIsPlay(false);
        }
    };

    const handleOpenCamera = (value) => {
        openStream(value, user.camera);
        setActiveCamera(value);
    };

    return (
        <div className={cx('user-item') + ' active'} onClick={() => handleSelect(user)}>
            <span className={cx('name')}>{user.name}</span>
            {!isPlay && (
                <>
                    <img className={cx('avatar')} src={user.avatar} alt="avatar" />
                    <div className={cx('frame-image')} style={{ display: isVideoPlay ? 'none' : '' }}>
                        <div className={cx('frame-name')}>
                            <div className={cx('frame-avatar')}>
                                <img src={user.avatar} alt="" />
                            </div>
                        </div>
                        <h1>{user.name}</h1>
                    </div>
                </>
            )}
            <video ref={videoTag} src="" className={cx('video')}></video>
            <video ref={audioTag} src=""></video>
            <div className={cx('tool')}>
                {user.camera && (
                    <div
                        className={cx('btn', activeCamera && 'active')}
                        onClick={() => {
                            handleOpenCamera(!activeCamera);
                        }}
                    >
                        <FontAwesomeIcon icon={faCamera} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserItem;
