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
    const [isPlayVideo, setPlayVideo] = useState(false);
    const [iconFullScreen, setIconFullScreen] = useState(false);
    const [iconFullScreenMedia, setIconFullScreenMedia] = useState(true);

    const handleFullScreenMedia = () => {
        props.videoTag.current.requestFullscreen();
    };

    const handleOpenStream = (stream) => {
        props.videoTag.current.srcObject = stream;
        props.videoTag.current.play();
    };

    useEffect(() => {
        if (props.videoTag.current.srcObject) {
            setPlayVideo(true);
        } else {
            setPlayVideo(false);
        }
        if(props.user && props.user.stream.length){
            props.videoTag.current.srcObject = props.user.stream[0];
            props.videoTag.current.play();
        }
        
    }, [props]);

    
    return (
        <div className={cx('wrapper')} style={iconFullScreen ? styleFullScreen : styleNormal}>
            <div className={cx('wrap-box')}>
                <div className={cx('footer')}>
                    {!iconFullScreen ? (
                        <>
                            {props.user && (
                                <div style={{ width: '120px', display: 'flex', justifyContent: 'space-around' }}>
                                    {props.user.stream.map((stream, index) => (
                                        <Tooltip title="Play video" key={index}>
                                            <div
                                                className={cx('btn', true && 'active')}
                                                onClick={() => handleOpenStream(stream)}
                                            >
                                                <FontAwesomeIcon icon={faCirclePlay} />
                                            </div>
                                        </Tooltip>
                                    ))}
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
            {props.user && (
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
