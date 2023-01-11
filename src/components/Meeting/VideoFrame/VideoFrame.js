import classNames from 'classnames/bind';
import styles from './VideoFrame.module.scss';

const cx = classNames.bind(styles);

function VideoFrame(props) {

    return (
        <div className={cx('wrapper')}>
            <video src="" ref={props.videoTag} width="800px" height="450px"></video>
        </div>
    );
}

export default VideoFrame;
