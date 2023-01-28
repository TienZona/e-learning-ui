import classNames from 'classnames/bind';
import styles from './Meeting.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import VideoFrame from '~/components/Meeting/VideoFrame/VideoFrame';
import ToolBar from '~/components/Meeting/ToolBar';
import SliderUser from '~/components/Meeting/SliderUser';
import ChatBox from '~/components/Meeting/ChatBox';
import UserItem from '~/components/Meeting/UserItem';
// import FeatureBox from '~/components/Meeting/FeatureBox';

// import { Peer } from 'peerjs';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');

const cx = classNames.bind(styles);
function Meeting() {
    const users = useSelector((state) => state.user.list);
    const videoTag = useRef();
    const [camera, setCamera] = useState(false);
    const [streaming, setStreaming] = useState();
    const [room, setRoom] = useState('');
    const openStream = () => {
        const config = { audio: true, video: true };
        return navigator.mediaDevices.getUserMedia(config);
    };

    const username = useSelector((state) => state.auth.username)
    console.log(username)
    const playStream = (videoTag, stream) => {
        videoTag.srcObject = stream;
        videoTag.play();
    };

    useEffect(() => {
        const url = window.location.pathname;
        const id = url.substring(url.lastIndexOf('/') + 1);
        setRoom(id);

        if (username !== '' && id !== '') {
            socket.emit('join_room', id);
            console.log('join room')
        }
    }, []);

    useEffect(() => {
        if (camera) {
            openStream().then((stream) => {
                setStreaming(stream);
                playStream(videoTag.current, stream);
            });
        } else {
            if (streaming) {
                streaming.getTracks().forEach((track) => track.stop());
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [camera]);

    return (
        <div className={cx('')}>
            <div className="xl:container p-8">
                <div className="grid grid-cols-12 gap-4 py-4">
                    <div className={cx('left-content') + ' col-span-2'}>{/* <FeatureBox /> */}</div>
                    <div className={cx('mid-content') + ' col-span-8'}>
                        <VideoFrame videoTag={videoTag} />
                        <ToolBar camera={camera} onCamera={setCamera} />
                    </div>
                    <div className={cx('right-content') + ' col-span-2'}>
                        <ChatBox socket={socket} username={username} room={room} />
                    </div>
                </div>
                <div className={cx('footer') + ' grid grid-cols-12 gap-8'}>
                    <div className={cx('left') + ' col-span-2'}></div>
                    <div className={cx('mid') + ' col-span-8'}>
                        {users.length < 4 ? (
                            <div className="flex justify-evenly">
                                {users.map((item, index) => (
                                    <UserItem key={index} item={item} />
                                ))}
                            </div>
                        ) : (
                            <SliderUser users={users} />
                        )}
                    </div>
                    <div className={cx('right') + ' col-span-2'}></div>
                </div>
            </div>
        </div>
    );
}

export default Meeting;
