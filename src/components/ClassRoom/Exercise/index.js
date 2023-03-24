import styles from './Exercise.module.scss';
import classNames from 'classnames/bind';

import AssignmentIcon from '~/assets/icon/assignment.png';
import { ClockCircleOutlined } from '@ant-design/icons';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import previousIcon from '~/assets/icon/previous.png';

import { Button as ButtonMaterial } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AvatarCircle from '~/components/Global/AvatarCircle';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Exercise({ setIsTimeLine }) {
    const auth = useSelector((state) => state.auth);
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div className={cx('wrap')}>
            <button className={cx('btn-back')} onClick={() => setIsTimeLine(true)}>
                <img src={previousIcon} width="50" alt="" />
            </button>
            <div className="grid grid-cols-2 gap-10">
                <div className="col-span-1">
                    <div className="flex justify-between items-center">
                        <img src={AssignmentIcon} className={cx('icon')} alt="" />
                        <span>100 Điểm</span>
                        <p className="flex items-center">
                            <span>Hạn </span>
                            <ClockCircleOutlined className="m-4" style={{ color: 'aqua' }} />
                            <span>12:00</span>
                        </p>
                        <div className={cx('lock')}>
                            <span>24 thg 3 - Đã làm</span>
                        </div>
                    </div>
                    <h2 className={cx('title')}>TIÊU ĐỀ</h2>
                    <div>
                        <div className={cx('item', ' grid grid-cols-4 p-2')}>
                            <div className="col-span-1 p-2">
                                <img
                                    className={cx('item-img')}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyc0Q04qrq9e7j4ke0LbHt_k7ACNQtiv2bC2xwBmt1j9kQ7XRNGuoyjUxRUdwJTqYUFB8&usqp=CAU"
                                    alt=""
                                />
                            </div>
                            <div className={cx('item-content', ' "col-span-3"')}>
                                <h2 className="text-3xl mb-6">Tên file</h2>
                                <p className=" items-center">link</p>
                            </div>
                        </div>
                        <div className={cx('item', ' grid grid-cols-4 p-2')}>
                            <div className="col-span-1 p-2">
                                <img
                                    className={cx('item-img')}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyc0Q04qrq9e7j4ke0LbHt_k7ACNQtiv2bC2xwBmt1j9kQ7XRNGuoyjUxRUdwJTqYUFB8&usqp=CAU"
                                    alt=""
                                />
                            </div>
                            <div className={cx('item-content', ' "col-span-3"')}>
                                <h2 className="text-3xl mb-6">Tên file</h2>

                                <p className=" items-center">Ảnh</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('submit', ' flex items-center justify-between')}>
                        <h2>Nộp bài</h2>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />} style={{ background: '#fff' }}>
                                Upload
                            </Button>
                        </Upload>
                    </div>
                    <div className={cx('item', ' grid grid-cols-4 p-2')}>
                        <div className="col-span-1 p-2">
                            <img
                                className={cx('item-img')}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyc0Q04qrq9e7j4ke0LbHt_k7ACNQtiv2bC2xwBmt1j9kQ7XRNGuoyjUxRUdwJTqYUFB8&usqp=CAU"
                                alt=""
                            />
                        </div>
                        <div className={cx('item-content', ' "col-span-3"')}>
                            <h2 className="text-3xl mb-6">Tên file</h2>

                            <p className=" items-center">file</p>
                        </div>
                    </div>
                    <div className="float-right items-center mt-10">
                        <ButtonMaterial variant="contained" endIcon={<SendIcon />} style={{ fontSize: 12 }}>
                            Nộp bài
                        </ButtonMaterial>
                    </div>
                </div>
                <div className="col-span-1">
                    <h1 className={cx('title') + ' text-center text-sm'}>Hướng dẫn</h1>
                    <div className={cx('intruction')}>
                        <p>- Hướng dẫn, hướng dẫn làm bài</p>
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
