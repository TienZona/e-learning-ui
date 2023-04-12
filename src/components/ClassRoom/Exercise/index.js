import styles from './Exercise.module.scss';
import classNames from 'classnames/bind';

import AssignmentIcon from '~/assets/icon/assignment.png';
import { ClockCircleOutlined } from '@ant-design/icons';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

import { Button as ButtonMaterial } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AvatarCircle from '~/components/Global/AvatarCircle';
import { useSelector } from 'react-redux';
import { formatTime } from '~/locallibraries/timestamp';
import { useEffect, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';

const cx = classNames.bind(styles);

function Exercise({ setIsTimeLine, exercise }) {
    const auth = useSelector((state) => state.auth);
    const [uploadFile, setUploadFile] = useState([]);

    const props = {
        name: 'file',
        action: 'http://localhost:3000/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setUploadFile((prev) => [...prev, info.file]);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onRemove(info) {
            const newFiles = uploadFile.filter((file) => {
                return file !== info;
            });
            setUploadFile(newFiles);
        },
    };

    const checkSubmitExercise = (exercise) => {
        let result = false;
        exercise.students.forEach((student) => {
            if (auth.email === student.email && student.submit) result = true;
        });
        return result;
    };

    const checkLate = (exercise) => {
        // 0 = chua lam, 1 = da lam, 2 = sap den han, 3 = qua han
        let result = 0;
        if (checkSubmitExercise(exercise)) {
            result = 1;
        } else {
            const deadline = new Date(exercise.deadline);
            const now = new Date();
            const temp = deadline.getTime() - now.getTime();
            if (temp < 86400000 && temp > 0) {
                result = 2;
            }

            if (temp >= 86400000) {
                result = 0;
            }

            if (temp <= 0) {
                result = 3;
            }
        }
        return result;
    };

    const handleDateTime = (exercise) => {
        let DateTime = '';
        const check = checkLate(exercise);
        let text = '';
        switch (check) {
            case 0:
                text = 'Chưa làm';
                break;
            case 1:
                text = 'Đã làm';
                break;
            case 2:
                text = 'Sắp đến hạn';
                break;
            case 3:
                text = 'Quá hạn';
                break;
            default:
                text = 'Chưa làm';
        }

        const deadline = new Date(exercise.deadline);
        const day = deadline.getDate();
        const month = deadline.getMonth() + 1;
        if (checkSubmitExercise(exercise)) {
            DateTime = `${day} thg ${month} - ${text}`;
        } else {
            DateTime = `${day} thg ${month} - ${text}`;
        }
        return DateTime;
    };

    const submitExercise = () => {
        const ID_CLASS = window.location.href.split('/').reverse()[0];

        const submitExc = {
            id_exc: exercise._id,
            email: auth.email,
            name: auth.name,
            avatar: auth.avatar,
            files: uploadFile,
            id_class: ID_CLASS,
            score: 0,
        };

        axios
            .post(`http://localhost:3000/api/classroom/student/exercise`, submitExc)
            .then((res) => {
                if (res.data.submit) {
                    message.success('Bạn đã nộp bài!');
                } else {
                    message.error('Bạn không thể nộp bài vì đã quá hạn nộp.');
                }
            })
            .catch((err) => console.log(err));
    };

    const downloadFile = (name) => {
        axios({
            url: 'http://localhost:3000/download',
            method: 'GET',
            responseType: 'blob',
            params: {
                fileName: name,
            },
        }).then((response) => {
            const href = URL.createObjectURL(response.data);
            console.log(response)
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    };

    return (
        <div className={cx('wrap')}>
            <div className="grid grid-cols-2 gap-10">
                <div className="col-span-1">
                    <div className="flex justify-between items-center">
                        <img src={AssignmentIcon} className={cx('icon')} alt="" />
                        <span>{exercise.score} Điểm</span>
                        <p className="flex items-center">
                            <span>Hạn </span>
                            <ClockCircleOutlined className="m-4" style={{ color: 'aqua' }} />
                            <span>{formatTime(exercise.deadline)}</span>
                        </p>
                        <div className={cx('lock')}>
                            <span>{handleDateTime(exercise)}</span>
                        </div>
                    </div>
                    <h2 className={cx('title')}>{exercise.title}</h2>
                    <div>
                        {exercise.files.map((file) => (
                            <div className={cx('item', ' grid grid-cols-4 p-2')}>
                                <div className="col-span-1 p-2 flex justify-center items-center">
                                    <Button
                                        onClick={() => downloadFile(file.name)}
                                        className={cx('btn-download')}
                                        type="primary"
                                        shape="round"
                                        icon={<DownloadOutlined />}
                                        size="medium"
                                    >Tải xuống</Button>
                                </div>
                                <div className={cx('item-content', ' "col-span-3"')}>
                                    <h2 className="text-3xl mb-1">{file.name}</h2>
                                    <a
                                        href={'http://localhost:3000/files/' + file.name}
                                        className=" items-center"
                                        target="blank"
                                    >
                                        {'http://localhost:3000/files/' + file.name}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('submit', ' flex items-center justify-between')}>
                        <h2>Nộp bài</h2>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />} style={{ background: '#fff' }}>
                                Upload
                            </Button>
                        </Upload>
                    </div>
                    {uploadFile &&
                        uploadFile.map((file) => (
                            <div className={cx('item', ' grid grid-cols-4 p-2')}>
                                <div className="col-span-1 p-2">
                                    <img
                                        className={cx('item-img')}
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyc0Q04qrq9e7j4ke0LbHt_k7ACNQtiv2bC2xwBmt1j9kQ7XRNGuoyjUxRUdwJTqYUFB8&usqp=CAU"
                                        alt=""
                                    />
                                </div>
                                <div className={cx('item-content', ' "col-span-3"')}>
                                    <h2 className="text-3xl mb-2">{file.name}</h2>

                                    <a
                                        href={'http://localhost:3000/files/' + file.name}
                                        className=" items-center"
                                        target="blank"
                                    >
                                        {'http://localhost:3000/files/' + file.name}
                                    </a>
                                </div>
                            </div>
                        ))}
                    <div className="float-right items-center mt-10">
                        <ButtonMaterial
                            variant="contained"
                            endIcon={<SendIcon />}
                            style={{ fontSize: 12 }}
                            onClick={() => submitExercise()}
                        >
                            Nộp bài
                        </ButtonMaterial>
                    </div>
                </div>
                <div className="col-span-1">
                    <h1 className={cx('title') + ' text-center text-sm'}>Hướng dẫn</h1>
                    <div className={cx('intruction')}>
                        <p>- {exercise.content}</p>
                    </div>
                    <h1 className={cx('title') + ' text-center text-sm'}>Hỏi đáp</h1>
                    <div className="p-6 flex">
                        <AvatarCircle avatar={auth.avatar} size="40px" border="aqua" />
                        <div className={cx('comment-input')}>
                            <input type="text" placeholder="Nhập câu hỏi ..." />
                            <span />
                        </div>
                        <button>
                            <SendOutlined style={{ fontSize: 18 }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Exercise;
