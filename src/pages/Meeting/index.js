import classNames from 'classnames/bind';
import styles from './Meeting.module.scss';
import { useRef, useState, useEffect } from 'react';

import VideoFrame from '~/components/Meeting/VideoFrame/VideoFrame';
import ToolBar from '~/components/Meeting/ToolBar';
import SliderUser from '~/components/Meeting/SliderUser';

const cx = classNames.bind(styles);

function Meeting() {
    const users = [
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
        },
        {
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDClP4ga9K8iOsHa5xVUcbwyrIqGOcaTxSXQ&usqp=CAU',
            name: 'Chung Phat Tien',
        },
    ];
    const videoTag = useRef();
    const [camera, setCamera] = useState(false);
    const [mediaStream, setMedia] = useState(null);

    function addVideoStream(video, stream) {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        video.append(video);
    }

    function stopStreamedVideo(videoElem) {
        const stream = videoElem.srcObject;
        const tracks = stream.getTracks();
      
        tracks.forEach((track) => {
          track.stop();
        });
      
        videoElem.srcObject = null;
      }

    useEffect(() => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (camera) {
            if (navigator.getUserMedia) {
                const video = document.querySelector('video');
                navigator.getUserMedia(
                    { audio: true, video: { width: 1280, height: 720 } },
                    (stream) => {
                        video.srcObject = stream;
                        video.onloadedmetadata = (e) => {
                            video.play();
                        };
                        console.log(stream)
                    },
                    (err) => {
                        console.error(`The following error occurred: ${err.name}`);
                    },
                );
            } else {
                console.log('getUserMedia not supported');
            }
        }else{
            stopStreamedVideo()
        }
    }, [camera]);

    return (
        <div className={cx('')}>
            <header className={cx('header')}></header>
            <div className="xl:container px-8">
                <div className="grid grid-cols-12 gap-4 py-4">
                    <div className={cx('left-content') + ' col-span-2'}></div>
                    <div className={cx('mid-content') + ' col-span-8'}>
                        <VideoFrame videoTag={videoTag} />
                        <ToolBar camera={camera} onCamera={setCamera} />
                    </div>
                    <div className={cx('right-content') + ' col-span-2'}></div>
                </div>
                <div className="grid grid-cols-6">
                    <div className={cx('footer') + ' col-start-2 col-span-4'}>
                        {/* <Slider /> */}

                        <SliderUser users={users} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Meeting;
