import classNames from 'classnames/bind';
import styles from './VideoFrame.module.scss';
import { useEffect, useState } from 'react';

import { Tooltip } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import AvatarCircle from '~/components/Global/AvatarCircle';

const cx = classNames.bind(styles);

const styleFullScreen = {
    zIndex: '1000',
    inset: '0',
    width: '100%',
    height: '100%',
    position: 'fixed',
    borderRadius: '0',
};

const styleNormal = {
    position: 'absolute',
    width: '800px',
    height: '450px',
};

function VideoFrame(props) {
    const [isPlayVideo, setPlayVideo] = useState(true);
    const [iconFullScreen, setIconFullScreen] = useState(false);

    const handleFullScreenMedia = () => {
        props.videoTag.current.requestFullscreen();
    };

    const handleOpenStream = (stream) => {
        if (stream) {
            props.videoTag.current.srcObject = stream;
            props.videoTag.current.play();
            setPlayVideo(true);
            console.log(isPlayVideo);
        }
    };

    useEffect(() => {
        if (props.user.camera) {
            setPlayVideo(true);
            handleOpenStream(props.user.camera);
        } else if (props.currentStream) {
            handleOpenStream(props.currentStream);
        } else {
            setPlayVideo(false);
        }
    }, [props]);

    useEffect(() => {
        console.log(isPlayVideo);
    }, [isPlayVideo]);

    return (
        <div className={cx('wrapper')} style={iconFullScreen ? styleFullScreen : styleNormal}>
            <div className={cx('wrap-box')}>
                <div className={cx('footer')}>
                    {!iconFullScreen ? (
                        <>
                            {props.user && (
                                <div style={{ width: '120px', display: 'flex', justifyContent: 'space-around' }}>
                                    {props.user.camera && (
                                        <Tooltip title="Play video">
                                            <div
                                                className={cx('btn', isPlayVideo && 'active')}
                                                onClick={() => handleOpenStream(props.user.camera)}
                                            >
                                                <FontAwesomeIcon icon={faCirclePlay} />
                                            </div>
                                        </Tooltip>
                                    )}
                                </div>
                            )}
                            <Tooltip title="Full Screen Website">
                                <FullscreenIcon
                                    sx={{ fontSize: '30px', margin: '0 12px', color: '#fff', zIndex: '10' }}
                                    onClick={() => setIconFullScreen(true)}
                                ></FullscreenIcon>
                            </Tooltip>
                            <Tooltip title="Full Screen Media">
                                <FitScreenIcon
                                    sx={{ fontSize: '30px', margin: '0 12px', color: '#fff', zIndex: '10' }}
                                    onClick={() => handleFullScreenMedia()}
                                ></FitScreenIcon>
                            </Tooltip>
                        </>
                    ) : (
                        <Tooltip title="Exit Full Screen">
                            <FullscreenExitIcon
                                sx={{ fontSize: '30px', margin: '0 12px', color: '#fff', zIndex: '10' }}
                                onClick={() => setIconFullScreen(false)}
                            ></FullscreenExitIcon>
                        </Tooltip>
                    )}
                </div>
            </div>
            {!isPlayVideo && (
                <div className={cx('frame-image')} style={{ display: isPlayVideo && 'none' }}>
                    <div className={cx('frame-name')}>
                        <div className={cx('frame-avatar')}>
                            <img src={props.user.avatar} alt="" />
                        </div>
                        <h1>{props.user.name}</h1>
                    </div>
                </div>
            )}
            <video src="" ref={props.videoTag} width="100%"></video>
        </div>
    );
}

export default VideoFrame;
