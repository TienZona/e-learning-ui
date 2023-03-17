import classNames from 'classnames/bind';
import Navbar from '~/components/ClassRoom/Navbar';
import Posts from '~/components/ClassRoom/Posts';
import styles from './ClassRoom.module.scss';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Input } from 'antd';
import Button from '~/components/Global/Button';
import ListOnline from '~/components/ClassRoom/ListOnline';
import Calendar from '~/components/ClassRoom/Calendar';
import Member from '~/components/ClassRoom/Member';

const { TextArea } = Input;

const cx = classNames.bind(styles);

function ClassRoom() {
    const [selectFrame, setSelectFrame] = useState('news');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };
    return (
        <div className={cx('wrap')}>
            <div className={cx('header')}>
                <div className={cx('heading')}>
                    <h1>Lop 12A3 2021-2022</h1>
                </div>
                <div className={cx('box')}>
                    {(selectFrame === 'news' && <h1>Các thông báo lớp học</h1>) ||
                        (selectFrame === 'calendar' && <h1>Lịch học</h1>) ||
                        (selectFrame === 'member' && <h1>Mọi người</h1>)}
                    <button className={cx('btn-create')} onClick={handleOpen}>
                        <span>Tạo thông báo </span>
                        <div />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-2">
                    <Navbar active={selectFrame} setActive={setSelectFrame} />
                </div>
                <div className="col-span-8">
                    <div className={cx('content')}>
                        {(selectFrame === 'news' && <Posts />) ||
                            (selectFrame === 'calendar' && <Calendar />) ||
                            (selectFrame === 'member' && <Member />)}
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
                    <Input showCount maxLength={50} onChange={(e) => onChange(e)} />
                    <br />
                    <br />
                    <b>Nội dung</b>
                    <TextArea showCount style={{ height: 120 }} maxLength={999} onChange={(e) => onChange(e)} />
                    <div className={cx('modal-btn')}>
                        <Button>Thêm</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ClassRoom;
