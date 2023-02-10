import classNames from 'classnames/bind';
import styles from './VideoFrame.module.scss';
import { useEffect, useState } from 'react';

import { Tooltip } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FitScreenIcon from '@mui/icons-material/FitScreen';

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
    const [iconFullScreen, setIconFullScreen] = useState(false);
    const [iconFullScreenMedia, setIconFullScreenMedia] = useState(true);
    

    const handleFullScreenMedia = () => {
        props.videoTag.current.requestFullscreen();
    }

    return (
        <div className={cx('wrapper')} style={iconFullScreen ? styleFullScreen : styleNormal}>
            <div className={cx('wrap-box')}>
                <div className={cx('footer')}>
                    {!iconFullScreen ? (
                        <>
                            <Tooltip title="Full Screen Website">
                                <FullscreenIcon
                                    sx={{ fontSize: '30px',margin: '0 12px', color: '#fff', zIndex: '10' }}
                                    onClick={() => setIconFullScreen(true)}
                                ></FullscreenIcon>
                            </Tooltip>
                            <Tooltip title="Full Screen Media">
                                <FitScreenIcon
                                    sx={{ fontSize: '30px',margin: '0 12px', color: '#fff', zIndex: '10' }}
                                    onClick={() => handleFullScreenMedia()}
                                ></FitScreenIcon>
                            </Tooltip>
                        </>
                    ) : (
                        <Tooltip title="Exit Full Screen">
                            <FullscreenExitIcon
                                sx={{ fontSize: '30px',margin: '0 12px', color: '#fff', zIndex: '10' }}
                                onClick={() => setIconFullScreen(false)}
                            ></FullscreenExitIcon>
                        </Tooltip>
                    )}
                </div>
            </div>
            <video src="" ref={props.videoTag} width="100%"></video>
        </div>
    );
}

export default VideoFrame;
