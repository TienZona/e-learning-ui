import classNames from 'classnames/bind';
import styles from './Meeting.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Peer } from 'peerjs';
import { useNavigate } from 'react-router-dom';

// material UI
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

import VideoFrame from '~/components/Meeting/VideoFrame/VideoFrame';
import ToolBar from '~/components/Meeting/ToolBar';
import SliderUser from '~/components/Meeting/SliderUser';
import ChatBox from '~/components/Meeting/ChatBox';
import UserItem from '~/components/Meeting/UserItem';
import ToolHost from '~/components/Meeting/ToolHost';
import FeatureBox from '~/components/Meeting/FeatureBox';

import {
    addListUser,
    addUser,
    setStream,
    removeList,
    setAudio,
    deleteStream,
    removeUser,
    setCamera,
    deleteCamera,
} from '~/redux/actions/user';
import { removeChat } from '~/redux/actions/chat';
import io from 'socket.io-client';
import axios from 'axios';
import { Button, Modal } from 'antd';

import handHello from '~/assets/icon/hello.png';
import audioJoin from '~/assets/audio/join-room.mp3';
import audiHandUp from '~/assets/audio/ting.mp3';

const host = 'http://localhost:3000';
const cx = classNames.bind(styles);
function Meeting() {
    document.title = 'Cuộc họp diễn ra';
    const navigate = useNavigate();
    const audioJoinRef = useRef(null);
    const audioHandRef = useRef(null);
    const [userHandsUp, setUserHandsUp] = useState(null);
    const [roomMeet, setRoomMeet] = useState(null);
    const socket = useRef(io.connect(host));
    const [survey, setSurvey] = useState(null);
    const [question, setQuestion] = useState(null);
    const [isModalCloseOpen, setIsModalCloseOpen] = useState(false);

    // hook
    const [isCamera, setIsCamera] = useState(false);
    const [isAudio, setIsAudio] = useState(false);
    const [isScreen, setIsScreen] = useState(false);
    const [isHandsUp, setIsHandsUp] = useState(false);
    const [screenShare, setScreenShare] = useState(null);
    const [streaming, setStreaming] = useState();
    const [audioStream, setAudioStream] = useState(null);
    const [roomId, setRoomID] = useState('');
    const [peerID, setPeerID] = useState(null);
    const peerInstance = useRef(null);
    const currentUserVideoRef = useRef(null);
    const [userFrame, setUserFrame] = useState(null);
    // redux
    // const [users, setUsers] = useState([]);
    const users = useSelector((state) => state.user.list);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const ROOM_ID = window.location.href.split('/').reverse()[0];
        axios
            .get(`http://localhost:3000/meet/room/${ROOM_ID}`)
            .then((res) => {
                setTimeout(() => {
                    setRoomMeet(res.data);
                }, 1000);
                console.log(res);
            })
            .catch((err) => console.log(err));

        socket.current.on('other-user-join', (members) => {
            dispatch(addListUser(members));
            audioJoinRef.current.play();
            socket.current.emit('list-user', members);
        });

        socket.current.on('list-user', (members) => {
            dispatch(addListUser(members));
        });

        socket.current.on('user-hands-up', (user) => {
            audioHandRef.current.play();
            setUserHandsUp(user);
            setTimeout(() => {
                setUserHandsUp(null);
                setIsHandsUp(false);
            }, 60000);
        });

        socket.current.on('other-user-disconnected', (socket_id) => {
            dispatch(removeUser(socket_id));
        });

        socket.current.on('user_connected', (id) => {
            console.log('socket.current connected' + id);
        });

        socket.current.on('another-connected', (data) => console.log);

        socket.current.on('new-survey', (data) => setSurvey(data));
        socket.current.on('new-vote', (data) => setSurvey(data));
        socket.current.on('new-question', (data) => {
            setQuestion(data);
        });

        audioJoinRef.current.play();

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            socket.current.disconnect();
            dispatch(removeChat());
            dispatch(removeList());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isHandsUp) {
            socket.current.emit('hands-up', auth);
        }
    }, [auth, isHandsUp]);

    const handleCloseMeeting = () => {
        const ROOM_ID = window.location.href.split('/').reverse()[0];
        axios.delete(`http://localhost:3000/meet/${ROOM_ID}`).then((res) => {
            if (res.status === 200) {
                setIsModalCloseOpen(false);
                navigate(`/meeting/end`);
            }
        });
    };

    const openStream = () => {
        const config = { audio: false, video: { width: 800, height: 450 } };
        return (
            navigator.mediaDevices.getUserMedia(config) ||
            navigator.mediaDevices.webkitGetUserMedia(config) ||
            navigator.mediaDevices.mozGetUserMedia(config) ||
            navigator.mediaDevices.msGetUserMedia(config)
        );
    };

    const openAudio = () => {
        const config = { audio: true };
        return (
            navigator.mediaDevices.getUserMedia(config) ||
            navigator.mediaDevices.webkitGetUserMedia(config) ||
            navigator.mediaDevices.mozGetUserMedia(config) ||
            navigator.mediaDevices.msGetUserMedia(config)
        );
    };

    function openScreenShare() {
        const config = { cursor: { width: 800, height: 450 } };
        return (
            navigator.mediaDevices.getDisplayMedia(config) ||
            navigator.mediaDevices.webkitGetDisplayMedia(config) ||
            navigator.mediaDevices.mozGetDisplayMedia(config) ||
            navigator.mediaDevices.msGetDisplayMedia(config)
        );
    }

    // stop only camera
    function stopVideoOnly(stream) {
        stream.getTracks().forEach(function (track) {
            track.stop();
        });
        currentUserVideoRef.current.srcObject = null;
        socket.current.emit('user-stop-stream', peerID);
    }

    // stop only mic
    function stopAudioOnly(stream) {
        stream.getTracks().forEach(function (track) {
            if (track.readyState === 'live' && track.kind === 'audio') {
                track.stop();
            }
        });
    }

    const [myStream, setMyStream] = useState(null);

    useEffect(() => {
        const peer = new Peer();
        const url = window.location.pathname;
        const ROOM_ID = url.substring(url.lastIndexOf('/') + 1);
        setRoomID(ROOM_ID);

        peer.on('open', (id) => {
            if (ROOM_ID !== '' && id !== '') {
                const user = {
                    avatar: auth.avatar,
                    name: auth.name,
                    userID: auth.userID,
                    email: auth.email,
                    peerID: id,
                    stream: [],
                    audio: null,
                    camera: null,
                };
                socket.current.emit('join_room', ROOM_ID, user, id);
                dispatch(addUser(user));
            }

            setPeerID(id);
        });

        peer.on('call', (call) => {
            call.answer(streaming);
            call.on('stream', function (reStream) {
                reStream.getTracks().forEach(function (track) {
                    if (track.kind === 'audio') {
                        // set audio redux
                        dispatch(setAudio(call.peer, reStream));
                    }
                    if (track.kind === 'video' && track) {
                        dispatch(setCamera(call.peer, reStream));
                    }
                });
            });

            call.on('close', () => {
                console.log('user close stream');
            });
        });
        peerInstance.current = peer;
        setUserFrame(auth);

        return () => {
            dispatch(removeList());
        };
    }, []);
    // call camera stream

    const callCamera = (remotePeerId, stream) => {
        const call = peerInstance.current.call(remotePeerId, stream);

        call.on('stream', (remoteStream) => {
            console.log(remoteStream);
        });
    };

    useEffect(() => {
        if (isCamera) {
            openStream().then((stream) => {
                // currentUserVideoRef.current.srcObject = stream;
                // currentUserVideoRef.current.play();
                setStreaming(stream);
                setMyStream(stream);
                stream.type = 'camera';
                users.forEach((user) => {
                    if (user.name !== auth.name) {
                        callCamera(user.peerID, stream);
                    }
                });

                dispatch(setStream(peerID, stream));
            });
        } else {
            if (streaming) {
                stopVideoOnly(streaming);
                setStreaming(null);
                setMyStream(null);
                dispatch(deleteStream(peerID));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCamera]);

    // call screen stream

    const callScreen = (remotePeerId, stream) => {
        const call = peerInstance.current.call(remotePeerId, stream);

        call.on('stream', (remoteStream) => {
            console.log(remoteStream);
        });
    };

    useEffect(() => {
        if (isScreen) {
            openScreenShare().then((stream) => {
                users.forEach((user) => {
                    if (user.name !== auth.name) {
                        callScreen(user.peerID, stream);
                    }
                });
                setMyStream(stream);

                setScreenShare(stream);
                dispatch(setStream(peerID, stream));
            });
        } else {
            if (screenShare) {
                stopVideoOnly(screenShare);
                setMyStream(null);

                dispatch(deleteStream(peerID));
            }
        }
    }, [isScreen]);
    // call audio stream

    const callAudio = (remotePeerId, stream) => {
        const call = peerInstance.current.call(remotePeerId, stream);

        call.on('stream', (remoteStream) => {
            console.log(remoteStream);
        });
    };

    useEffect(() => {
        if (isAudio) {
            openAudio().then((stream) => {
                dispatch(setAudio(peerID, stream));
                setAudioStream(stream);
                users.forEach((user) => {
                    if (user.name !== auth.name) {
                        callAudio(user.peerID, stream);
                    }
                });
            });
        } else {
            if (audioStream) {
                dispatch(setAudio(peerID, null));
                stopAudioOnly(audioStream);
            }
        }
    }, [isAudio]);

    const handleCopyRight = () => {
        navigator.clipboard.writeText(roomId);
    };

    const handleSelectUser = (user) => {
        setUserFrame(user);
    };

    return (
        <div>
            {roomMeet ? (
                <div className={cx('')}>
                    {auth.email === roomMeet.author.email && (
                        <ToolHost setSurvey={setSurvey} setQuestion={setQuestion} socket={socket.current} />
                    )}
                    <div className={cx('id-meeting')}>
                        <h1>{roomId}</h1>
                        <Tooltip title="Copy" size="large">
                            <div className={cx('icon-saved')} onClick={handleCopyRight}>
                                <ContentCopyIcon></ContentCopyIcon>
                            </div>
                        </Tooltip>
                    </div>
                    <div className={cx('close-meeting')}>
                        {auth.email === roomMeet.author.email && (
                            <Button type="primary" danger onClick={() => setIsModalCloseOpen(true)}>
                                Đóng buổi học
                            </Button>
                        )}
                        <Modal
                            open={isModalCloseOpen}
                            closable={false}
                            footer={null}
                            onOk={() => setIsModalCloseOpen(false)}
                            onCancel={() => setIsModalCloseOpen(false)}
                        >
                            <h1 className="text-3xl text-center">Buổi học sẽ kết thúc tại đây bạn chắc chứ !</h1>
                            <div className="flex justify-center mt-6">
                                <Button type="primary" className="mx-4" danger onClick={() => handleCloseMeeting()}>
                                    Kết thúc ngay
                                </Button>
                                <Button
                                    type="primary"
                                    className="mx-4"
                                    onClick={() => setIsModalCloseOpen(false)}
                                    style={{ background: '#2587d3', borderColor: '#2587d3' }}
                                >
                                    Tiếp tục buổi học
                                </Button>
                            </div>
                        </Modal>
                    </div>
                    <div className="xl:container p-2">
                        <div className="grid grid-cols-12 gap-4 ">
                            <div className={cx('left-content') + ' col-span-2'}>
                                <FeatureBox survey={survey} question={question} socket={socket.current} />
                            </div>
                            <div className={cx('mid-content') + ' col-span-8'}>
                                <VideoFrame videoTag={currentUserVideoRef} user={userFrame} currentStream={myStream} />

                                <ToolBar
                                    camera={isCamera}
                                    onCamera={setIsCamera}
                                    audio={isAudio}
                                    onAudio={setIsAudio}
                                    screen={isScreen}
                                    onScreen={setIsScreen}
                                    handsUp={isHandsUp}
                                    onHandsUp={setIsHandsUp}
                                />
                            </div>
                            <div className={cx('right-content') + ' col-span-2'}>
                                <ChatBox socket={socket.current} username={auth.name} room={roomId} />
                            </div>
                        </div>
                        <div className={cx('footer') + ' grid grid-cols-12 gap-8'}>
                            <div className={cx('left') + ' col-span-2'}></div>
                            <div className={cx('mid') + ' col-span-8'}>
                                {!users ? (
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <CircularProgress color="secondary" />
                                    </div>
                                ) : users.length < 4 ? (
                                    <div className="flex justify-evenly">
                                        {users.map((user, index) => (
                                            <UserItem
                                                key={index}
                                                user={user}
                                                handleSelect={handleSelectUser}
                                                socket={socket.current}
                                            />
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
            ) : (
                <div className={cx('progress')}>
                    <CircularProgress />
                </div>
            )}
            {userHandsUp && (
                <div className={cx('say-hi')}>
                    <img src={handHello} alt="" width={40} />
                    <h3>{userHandsUp.name}</h3>
                </div>
            )}
            <audio ref={audioJoinRef} hidden>
                <source src={audioJoin} />
            </audio>
            <audio ref={audioHandRef} hidden>
                <source src={audiHandUp} />
            </audio>
        </div>
    );
}

export default Meeting;
