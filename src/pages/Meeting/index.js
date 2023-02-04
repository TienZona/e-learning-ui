import classNames from 'classnames/bind';
import styles from './Meeting.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Peer } from 'peerjs';
import io from 'socket.io-client';

// material UI
// import Box from '@mui/material/Box';
// // import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

import VideoFrame from '~/components/Meeting/VideoFrame/VideoFrame';
import ToolBar from '~/components/Meeting/ToolBar';
import SliderUser from '~/components/Meeting/SliderUser';
import ChatBox from '~/components/Meeting/ChatBox';
import UserItem from '~/components/Meeting/UserItem';
import { addListUser, addUser, setStream } from '~/redux/actions/user';

const socket = io.connect('http://localhost:3000');
const cx = classNames.bind(styles);

function Meeting() {
    // hook
    const [isCamera, setIsCamera] = useState(false);
    const [isAudio, setIsAudio] = useState(false);
    const [isScreen, setIsScreen] = useState(false)
    const [screenShare, setScreenShare] = useState(null)
    const [streaming, setStreaming] = useState();
    const [roomId, setRoomID] = useState('');
    const [peerID, setPeerID] = useState(null)
    const peerInstance = useRef(null);
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const [listRemoteStream, setListRemote] = useState([]);

    // redux
    // const [users, setUsers] = useState([]);
    const users = useSelector((state) => state.user.list);
    const username = useSelector((state) => state.auth.username);
    const dispatch = useDispatch();

    const openStream = () => {
        const config = { audio: true, video: { width: 800, height: 450 } };
        return (
            navigator.mediaDevices.getUserMedia(config) ||
            navigator.mediaDevices.webkitGetUserMedia(config) ||
            navigator.mediaDevices.mozGetUserMedia(config) ||
            navigator.mediaDevices.msGetUserMedia(config)
        );
    };

    function shareScreen() {
        const config = { cursor: true };
        return (
            navigator.mediaDevices.getDisplayMedia(config) ||
            navigator.mediaDevices.webkitGetDisplayMedia(config) ||
            navigator.mediaDevices.mozGetDisplayMedia(config) ||
            navigator.mediaDevices.msGetDisplayMedia(config)
        );
    }
    // stop both mic and camera
    function stopBothVideoAndAudio(stream) {
        stream.getTracks().forEach(function (track) {
            if (track.readyState === 'live') {
                track.stop();
            }
        });
    }

    // stop only camera
    function stopVideoOnly(stream) {
        stream.getTracks().forEach(function (track) {
            if (track.readyState === 'live' && track.kind === 'video') {
                track.stop();
            }
        });
    }

    // stop only mic
    function stopAudioOnly(stream) {
        stream.getTracks().forEach(function (track) {
            if (track.readyState === 'live' && track.kind === 'audio') {
                track.stop();
            }
        });
    }

    useEffect(() => {
        const peer = new Peer();
        const url = window.location.pathname;
        const ROOM_ID = url.substring(url.lastIndexOf('/') + 1);
        setRoomID(ROOM_ID);

        peer.on('open', (id) => {
            if (ROOM_ID !== '' && id !== '') {
                const USER_ID = Date.now();
                const user = {
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
                    name: username,
                    userID: USER_ID,
                    email: 'demo@gmail.com',
                    peerID: id,
                    stream: null,
                };
                socket.emit('join_room', ROOM_ID, user, id);
                console.log('join room ' + ROOM_ID);

                dispatch(addUser(user));
            }

            setPeerID(id);
        });

        peer.on('call', (call) => {
            call.answer(streaming);
            call.on('stream', function (reStream) {
                remoteVideoRef.current.srcObject = reStream;
                remoteVideoRef.current.play();
                console.log(reStream);
                setListRemote((prev) => [...prev, reStream]);
            });

            call.on('close', () => {
                console.log('user close stream');
            });
        });

        peerInstance.current = peer;
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

    useEffect(() => {
        socket.on('receive_user_join', (room, newUser) => {
            dispatch(addListUser(room.users));
            call(newUser.peerID);
        });
    }, [socket]);

    useEffect(() => {
        console.log(listRemoteStream);
    }, [listRemoteStream]);

    const call = (remotePeerId) => {
        openStream().then((stream) => {
            currentUserVideoRef.current.srcObject = stream;
            currentUserVideoRef.current.play();
            const call = peerInstance.current.call(remotePeerId, stream);

            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play();
            });
        });
    };

    useEffect(() => {
        if (isCamera) {
            openStream().then((stream) => {
                currentUserVideoRef.current.srcObject = stream;
                currentUserVideoRef.current.play();
                setStreaming(stream);
                // console.log(peerInstance.current)
                dispatch(setStream(peerID, stream));
            });
        } else {
            if (streaming) {
                stopBothVideoAndAudio(streaming);
                setStreaming(null);
                console.log('stop camera');
                console.log(users);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCamera]);

    useEffect(() => {
        if(isScreen){
            shareScreen().then(screenStream => {
                currentUserVideoRef.current.srcObject = screenStream;
                currentUserVideoRef.current.play(); 
                setScreenShare(screenStream);
            })
        }else{
            if(screenShare){
                screenShare.getTracks().forEach(function (track) {
                    if (track.readyState === 'live') {
                        track.stop();
                    }
                });
            }
        }
    }, [isScreen])

    useEffect(() => {
        if (streaming) {
            if (!isAudio) {
                stopAudioOnly(streaming);
            } else {
                // stream.getTracks().forEach(function (track) {
                //     if (track.readyState === 'live' && track.kind === 'audio') {
                //         console.log(track)
                //     }
                // });
            }
        }
    }, [isAudio]);

    return (
        <div className={cx('')}>
            <div className="xl:container p-8">
                <div className="grid grid-cols-12 gap-4 py-4">
                    <div className={cx('left-content') + ' col-span-2'}></div>
                    <div className={cx('mid-content') + ' col-span-8'}>
                        <VideoFrame videoTag={currentUserVideoRef} />
                        <ToolBar camera={isCamera} onCamera={setIsCamera} audio={isAudio} onAudio={setIsAudio} screen={isScreen} onScreen={setIsScreen}/>
                    </div>
                    <div className={cx('right-content') + ' col-span-2'}>
                        <ChatBox socket={socket} username={username} room={roomId} />
                    </div>
                </div>
                <div className={cx('footer') + ' grid grid-cols-12 gap-8'}>
                    <div className={cx('left') + ' col-span-2'}></div>
                    <div className={cx('mid') + ' col-span-8'}>
                        {users.length < 4 ? (
                            <div className="flex justify-evenly">
                                {users.map((user, index) => (
                                    <UserItem key={index} user={user} stream={streaming} />
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
