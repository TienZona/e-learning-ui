import classNames from 'classnames/bind';
import AvatarCircle from '~/components/Global/AvatarCircle';
import styles from './PostItem.module.scss';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { getFormatDate, getFormatday, getTime } from '~/locallibraries/timestamp';
import { useEffect, useRef, useState } from 'react';
import ReplyItem from '../ReplyItem';
import React from 'react';
import axios from 'axios';

// materia ui
import { Box, Modal, Backdrop, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// ant design ui
import { message, Popconfirm } from 'antd';

const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    boxShadow: 24,
    p: 4,
};

function PostItem({ post, refresh, reset }) {
    const auth = useSelector((state) => state.auth);
    const [isShow, setIsShow] = useState(false);
    const [replies, setReplies] = useState([]);
    const [open, setOpen] = useState(false);
    const [inputRep, setInputRep] = useState(null);
    const [openProgress, setProgress] = useState(false);
    const inputRepRef = useRef(null);

    useEffect(() => {
        try {
            axios
                .get(`http://localhost:3000/api/classroom/post/reply/${post._id}`)
                .then((res) => {
                    setReplies((prev) => [...res.data]);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }, [isShow, post._id, open, post.created_at]);

    const submit = () => {
        if (inputRep) {
            setOpen(false);
            setInputRep(null);
            setProgress(true);
            createReply();
            return true;
        } else {
            inputRepRef.current.focus();
        }
    };

    const createReply = () => {
        const reply = {
            author: {
                email: auth.email,
                name: auth.name,
                avatar: auth.avatar,
            },
            content: inputRep,
            id_post: post._id,
        };
        try {
            axios
                .post(`http://localhost:3000/api/classroom/post/reply/${post._id}`, reply)
                .then((res) => {
                    setTimeout(() => {
                        setProgress(false);
                    }, 1000);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    };

    const deletePost = () => {
        try {
            axios
                .delete(`http://localhost:3000/api/classroom/post/${post._id}`)
                .then((res) => {
                    setTimeout(() => {
                        console.log(res);
                        if (res.status === 200 && res.data.modifiedCount) {
                            message.success('Xóa thành công!');
                            reset(!refresh);
                        } else {
                            message.error('Xóa thất bại!');
                        }
                    }, 500);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        post && (
            <div className={cx('wrap')}>
                <div className={cx('header')}>
                    <div className={cx('datetime')}>
                        <span>{getFormatday(post.created_at)} - </span>
                        <span className={cx('date')}> {getFormatDate(post.created_at)} </span>

                        <span className={cx('time')}>Lúc  {getTime(post.created_at)} </span>
                    </div>
                    <div className="flex items-center">
                        <div className={cx('author')}>
                            <h3>{post.author.name}</h3>
                            <AvatarCircle size="40px" border="blue" avatar={post.author.avatar} />
                        </div>

                        {auth.email === post.author.email && (
                            <div className={cx('delete')}>
                                <Popconfirm
                                    placement="bottomRight"
                                    title="Xóa thông báo"
                                    description="Bạn có chắc muốn xóa chứ?"
                                    onConfirm={() => deletePost()}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <DeleteIcon className={cx('icon-delete')} />
                                </Popconfirm>
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('content')}>
                    <h3 className={cx('title')}>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
                <div className={cx('footer')}>
                    <button className={cx('btn-open')} onClick={() => setOpen(true)}>
                        Trả lời <FontAwesomeIcon icon={faReply} />
                    </button>
                    <span>Các câu trả lời khác</span>
                    <div className={cx('show')}>
                        {isShow ? (
                            <button className={cx('btn-show')} onClick={() => setIsShow(!isShow)}>
                                Xem câu trả lời
                                <FontAwesomeIcon icon={faCaretDown} className={cx('icon')} />
                            </button>
                        ) : (
                            <button className={cx('btn-show')} onClick={() => setIsShow(!isShow)}>
                                Ẩn câu trả lời
                                <FontAwesomeIcon icon={faCaretUp} className={cx('icon')} />
                            </button>
                        )}
                    </div>
                    {!isShow && (
                        <div className={cx('list-reply') + ' grid grid-cols-3 gap-5'}>
                            {replies.map((reply, index) => (
                                <ReplyItem className="col-span-1" reply={reply} key={index} />
                            ))}
                        </div>
                    )}
                </div>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className={cx('modal')}>
                        <h2>Câu trả lời không quá 160 ký tự !</h2>
                        <div>
                            <input
                                ref={inputRepRef}
                                value={inputRep}
                                onChange={(e) => setInputRep(e.target.value)}
                                type="text"
                                className={cx('modal-input')}
                                placeholder="Nhập câu trả lời..."
                            />
                            <button className={cx('modal-btn')} onClick={() => submit()}>
                                Trả lời
                            </button>
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
            </div>
        )
    );
}

export default PostItem;
