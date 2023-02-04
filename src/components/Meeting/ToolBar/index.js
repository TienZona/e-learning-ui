import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMicrophone,
    faMicrophoneSlash,
    faVideo,
    faVideoSlash,
    faHand,
    faDisplay,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

import styles from './ToolBar.module.scss';

const cx = classNames.bind(styles);

function ToolBar(props) {
    const [hand, setHand] = useState(true);
    const [screen, setScreen] = useState(true);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item', props.audio && 'checked')} onClick={() => props.onAudio(!props.audio)}>
                <FontAwesomeIcon className={cx('icon-mic')} icon={props.audio ? faMicrophone : faMicrophoneSlash} />
            </div>
            <div className={cx('item', props.camera && 'checked')} onClick={() => props.onCamera(!props.camera)}>
                <FontAwesomeIcon className={cx('icon-mic')} icon={props.camera ? faVideo : faVideoSlash} />
            </div>
            <div className={cx('item', hand || 'checked')} onClick={() => setHand(!hand)}>
                <FontAwesomeIcon className={cx('icon-mic')} icon={faHand} />
            </div>
            <div className={cx('item', props.screen && 'checked')} onClick={() => props.onScreen(!props.screen)}>
                <FontAwesomeIcon className={cx('icon-mic')} icon={faDisplay} />
            </div>
        </div>
    );
}

export default ToolBar;
