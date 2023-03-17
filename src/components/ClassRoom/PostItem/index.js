import classNames from 'classnames/bind';
import AvatarCircle from '~/components/Global/AvatarCircle';
import styles from './PostItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import ReplyItem from '../ReplyItem';
import { useState } from 'react';

// materia ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

function PostItem({ post }) {
    const [isShow, setIsShow] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <div className={cx('datetime')}>
                    <span className={cx('time')}> 12:22 </span>
                    <span>Thứ 2 - </span>
                    <span className={cx('date')}>1 thg 3, 2023 </span>
                </div>
                <div className={cx('author')}>
                    <h3>{post.author.name}</h3>
                    <AvatarCircle
                        size="40px"
                        border="blue"
                        avatar=""
                    />
                </div>
            </div>
            <div className={cx('content')}>
                <h3 className={cx('title')}>{post.title}</h3>
                <p>{post.content}</p>
            </div>
            <div className={cx('footer')}>
                <button className={cx('btn-open')} onClick={handleOpen}>
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
                        <ReplyItem className="col-span-1" />
                        <ReplyItem className="col-span-1" />
                        <ReplyItem className="col-span-1" />
                        <ReplyItem className="col-span-1" />
                    </div>
                )}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={cx('modal')}>
                    <h2>Câu trả lời không quá 160 ký tự !</h2>
                    <div>
                        <input type="text" className={cx('modal-input')} placeholder="Nhập câu trả lời..." />
                        <button className={cx('modal-btn')} onClick={handleClose}>Trả lời</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default PostItem;
