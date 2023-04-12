import classNames from 'classnames/bind';
import Navbar from '~/components/ClassRoom/Navbar';
import Posts from '~/components/ClassRoom/Posts';
import styles from './ClassRoom.module.scss';
import { useRef, useState } from 'react';
import { Input } from 'antd';
import Button from '~/components/Global/Button';
import ListOnline from '~/components/ClassRoom/ListOnline';
import Calendar from '~/components/ClassRoom/Calendar';
import Member from '~/components/ClassRoom/Member';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// material ui
import { Backdrop, CircularProgress, Box, Modal } from '@mui/material';
import MenuTool from '~/components/ClassRoom/MenuTool';
import ModalExercise from '~/components/ClassRoom/ModalExercise';
import { Modal as ModalAnt, message } from 'antd';
import Exercise from '~/components/ClassRoom/ExercisePage';
import ModalCalender from '~/components/ClassRoom/ModalCalendar';
const { TextArea } = Input;

const cx = classNames.bind(styles);

function ClassRoom() {
    const [reset, setReset] = useState(false);
    const [ID_CLASS, setID_CLASS] = useState(null);
    const auth = useSelector((state) => state.auth);
    const [selectFrame, setSelectFrame] = useState('news');
    const [course, setCourse] = useState(null);
    const [open, setOpen] = useState(false);
    const [openProgress, setProgress] = useState(false);
    const [titleInput, setTitleInput] = useState(null);
    const [contentInput, setContentInput] = useState(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const [isModalExcer, setIsModalExcer] = useState(false);
    const [isModalCalender, setIsModalCalender] = useState(false);
    const [exercise, setExercise] = useState(null);
    const [calender, setCalender] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleModalExcer = () => setIsModalExcer(true);
    const handleModalcalender = () => setIsModalCalender(true);

    useEffect(() => {
        console.log(exercise);
    }, [exercise]);

    useEffect(() => {
        setID_CLASS(window.location.href.split('/').reverse()[0]);
        try {
            axios
                .get(`http://localhost:3000/api/class/${ID_CLASS}`)
                .then((res) => {
                    setTimeout(() => {
                        setCourse(res.data);
                    }, 500);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }, [ID_CLASS]);

    const validatorForm = () => {
        let result = true;
        if (!contentInput) {
            result = false;
            contentRef.current.focus();
        }
        if (!titleInput) {
            result = false;
            titleRef.current.focus();
        }

        return result;
    };

    const createPost = () => {
        if (validatorForm()) {
            const post = {
                id_class: ID_CLASS,
                title: titleInput,
                content: contentInput,
                author: {
                    email: auth.email,
                    name: auth.name,
                    avatar: auth.avatar,
                },
            };
            try {
                axios
                    .post(`http://localhost:3000/api/classroom/post`, post)
                    .then((res) => {
                        setOpen(false);
                        setTimeout(() => {
                            setProgress(false);
                            setReset(!reset);
                            message.success('Thành công!');
                        }, 500);
                        setProgress(true);
                    })
                    .catch((err) => console.log(err));
            } catch (err) {
                console.log(err);
            }
        }
    };

    const onSubmitCreateExercise = () => {
        setIsModalExcer(true);
        console.log(exercise);
        axios
            .post('http://localhost:3000/api/classroom/exercise', exercise)
            .then((res) => {
                setIsModalExcer(false);
                setTimeout(() => {
                    message.success(`Đã tạo bài tập.`);
                }, 500);
            })
            .catch((err) => {
                setTimeout(() => {
                    message.error(`Tạo bài tập thất bại.`);
                }, 500);
            });
    };

    const onSubmitCreateCalender = () => {
        console.log(calender);
        axios
            .post(`http://localhost:3000/api/classroom/calender/${ID_CLASS}`, calender)
            .then((res) => {
                setIsModalCalender(false);
                setTimeout(() => {
                    message.success(`Đã tạo Lịch.`);
                }, 500);
            })
            .catch((err) => {
                setTimeout(() => {
                    message.error(`Tạo Lịch thất bại.`);
                }, 500);
            });
    };

    const checkAuthor = () => {
        if (course.author.email === auth.email) return true;
        return false;
    };

    return course ? (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <div className={cx('heading')}>
                    <h1>{course && course.name}</h1>
                </div>
                <div className={cx('box')}>
                    {(selectFrame === 'news' && <h1>Các thông báo lớp học</h1>) ||
                        (selectFrame === 'calendar' && <h1>Lịch học</h1>) ||
                        (selectFrame === 'member' && <h1>Mọi người</h1>) ||
                        (selectFrame === 'exercise' && <h1>Bài tập</h1>)}
                    {checkAuthor() && (
                        <MenuTool
                            onClickNoti={handleOpen}
                            onClickExcer={handleModalExcer}
                            onClickCalender={handleModalcalender}
                        />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2">
                    <Navbar active={selectFrame} setActive={setSelectFrame} />
                </div>
                <div className="col-span-8">
                    <div className={cx('content')}>
                        {(selectFrame === 'news' && <Posts reset={reset} classID={ID_CLASS} />) ||
                            (selectFrame === 'calendar' && <Calendar />) ||
                            (selectFrame === 'member' && <Member />) ||
                            (selectFrame === 'exercise' && <Exercise />)}
                    </div>
                    <h1>hello</h1>
                </div>
                <div className="col-span-2">
                    <ListOnline />
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal} className={cx('modal')}>
                    <h1>THÊM THÔNG BÁO</h1>
                    <b>Tiêu đề</b>
                    <Input
                        ref={titleRef}
                        showCount
                        maxLength={50}
                        onChange={(e) => setTitleInput(e.target.value)}
                        required
                    />
                    <br />
                    <br />
                    <b>Nội dung</b>
                    <TextArea
                        ref={contentRef}
                        showCount
                        style={{ height: 120 }}
                        maxLength={999}
                        onChange={(e) => setContentInput(e.target.value)}
                        required
                    />
                    <div className={cx('modal-btn')} onClick={() => createPost()}>
                        <Button>Thêm</Button>
                    </div>
                </Box>
            </Modal>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openProgress}
                onClick={() => setProgress(true)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <ModalAnt
                width={1000}
                centered
                title="Thêm bài tập"
                open={isModalExcer}
                onOk={() => onSubmitCreateExercise()}
                onCancel={() => setIsModalExcer(false)}
                okType="danger"
            >
                <ModalExercise setExercise={setExercise} />
            </ModalAnt>
            <ModalAnt
                width={600}
                centered
                title="Tạo lịch học"
                open={isModalCalender}
                onOk={() => onSubmitCreateCalender()}
                onCancel={() => setIsModalCalender(false)}
                okType="danger"
            >
                <ModalCalender setCalender={setCalender} />
            </ModalAnt>
        </div>
    ) : (
        <div className='flex justify-center items-center' style={{height: '600px'}}> 
            <CircularProgress />
        </div>
    );
}

export default ClassRoom;
