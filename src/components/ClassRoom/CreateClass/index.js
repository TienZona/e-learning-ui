import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as React from 'react';
import styles from './CreateClass.module.scss';
import Slider from 'react-slick';
import BoxColor from '../BoxColor';
import uuid from 'react-uuid';
import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';

import { faPlus, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AvatarCircle from '~/components/Global/AvatarCircle';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Button, Popconfirm } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const cx = classNames.bind(styles);

const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
    arrows: false,
    dots: true,
    focusOnSelect: true,
};

const colors = [
    { color: ['#FAC945', '#f1e2a3'] },
    { color: ['#fa45d3', ' #efb6e3'] },
    { color: ['#454cfa', '#68fcb8'] },
    { color: ['#12edbd', '#e2f9fc'] },
    { color: ['#fa8145', '#FCE068'] },
    { color: ['#77e747', '#f9ffa8'] },
    { color: ['#a51aef', '#c395f1'] },
    { color: ['#ec4343', '#fce068'] },
];

const blue = {
    500: '#007FFF',
};

const grey = {
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
};

const Root = styled('span')(
    ({ theme }) => `
    font-size: 0;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
    margin: 10px;
    cursor: pointer;
  
    &.${switchUnstyledClasses.disabled} {
      opacity: 0.4;
      cursor: not-allowed;
    }
  
    & .${switchUnstyledClasses.track} {
      background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
      border-radius: 16px;
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
    }
  
    & .${switchUnstyledClasses.thumb} {
      display: block;
      width: 16px;
      height: 16px;
      top: 4px;
      left: 4px;
      border-radius: 16px;
      background-color: #fff;
      position: relative;
      
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
    }
  
    &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
      background-color: ${grey[500]};
      box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
    }
  
    &.${switchUnstyledClasses.checked} {
      .${switchUnstyledClasses.thumb} {
        left: 20px;
        top: 4px;
        background-color: #fff;
      }
  
      .${switchUnstyledClasses.track} {
        background: ${blue[500]};
      }
    }
  
    & .${switchUnstyledClasses.input} {
      cursor: inherit;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 1;
      margin: 0;
    }
    `,
);

function CreateClass({ classID, edit }) {
    const [ID_CLASS, setID_CLASS] = useState(null);
    const author = useSelector((state) => state.auth);
    const [theme, setTheme] = useState(['#FAC945', '#f1e2a3']);
    const [isPassword, setIsPassword] = useState(false);
    const [openSnackBar, setOpenSnack] = useState(false);

    const [category, setCate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDiscription] = useState('');
    const [password, setPassword] = useState('');

    const [inpuTitle, setInputTitle] = useState('');
    const [inputCate, setInputCate] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const inputCateRef = useRef(null);
    const inputTitlteRef = useRef(null);
    const inputDescriptionRef = useRef(null);
    const inputPasswordRef = useState(null);

    const label = { slotProps: { input: { 'aria-label': 'Demo switch' } } };

    const [course, setCourse] = useState({
        id: ID_CLASS,
        name: title,
        category: category,
        content: description,
        member: [],
        theme: theme,
        author: {
            name: author.name,
            avatar: author.avatar,
            email: author.email,
        },
        is_password: isPassword,
        password: password,
    });

    useEffect(() => {
        if (classID) {
            axios
                .get(`http://localhost:3000/api/class/${classID}`)
                .then((res) => {
                    setCourse(res.data);
                    setInputCate(res.data.category);
                    setInputTitle(res.data.name);
                    setInputDescription(res.data.content);
                    setIsPassword(res.data.is_password);
                    setInputPassword(res.data.password);
                    setCate(res.data.category);
                    setDiscription(res.data.content);
                    setTheme(res.data.theme);
                    setTitle(res.data.name);
                    setID_CLASS(res.data.id);
                })
                .catch((err) => console.log(err));
        } else {
            setID_CLASS(uuid().substring(0, 12));
        }
    }, [classID]);

    useEffect(() => {
        !isPassword ? setPassword('') : setPassword(password);
    }, [isPassword, password]);

    useEffect(() => {
        const newCourse = {
            id: ID_CLASS,
            name: title,
            category: category,
            content: description,
            member: [],
            theme: theme,
            author: {
                name: author.name,
                avatar: author.avatar,
                email: author.email,
            },
            is_password: isPassword,
            password: password,
        };

        setCourse(newCourse);
    }, [ID_CLASS, author.avatar, author.email, author.name, category, description, isPassword, password, theme, title]);

    const handleClick = (colorTheme) => {
        setTheme(colorTheme.color);
    };

    const saveCate = () => {
        if (inputCate) {
            setCate(inputCate);
        } else {
            inputCateRef.current.focus();
        }
    };
    useEffect(() => {
        console.log(title);
    }, [title]);

    const saveTitle = () => {
        if (inpuTitle) {
            setTitle(inpuTitle);
        } else {
            inputTitlteRef.current.focus();
        }
    };

    const saveDescription = () => {
        if (inputDescription) {
            setDiscription(inputDescription);
        } else {
            inputDescriptionRef.current.focus();
        }
    };

    const handleCopyIDClass = () => {
        navigator.clipboard.writeText(ID_CLASS);
        setOpenSnack(true);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit">
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const createClass = () => {
        if (validation(course)) {
            setOpen(true);
            try {
                axios
                    .post(`http://localhost:3000/api/class`, { course })
                    .then((res) => {
                        if (res.status === 200) {
                            setTimeout(() => {
                                setOpen(false);
                                notify('Tạo lớp học thành công!', 'success');
                            }, 500);
                        } else {
                            setTimeout(() => {
                                setOpen(false);
                                notify('Tạo lớp học thất bại!', 'error');
                            }, 500);
                        }
                    })
                    .catch((error) => console.log(error));
            } catch (err) {
                console.log(err);
            }
        }
    };

    const updateClass = () => {
        if (validation(course)) {
            setOpen(true);
            try {
                axios
                    .put(`http://localhost:3000/api/class/${course.id}`, { course })
                    .then((res) => {
                        if (res.status === 200) {
                            setTimeout(() => {
                                setOpen(false);
                                notify('Cập nhật thành công!', 'success');
                            }, 500);
                        } else {
                            setTimeout(() => {
                                setOpen(false);
                                notify('Cập nhật thất bại!', 'error');
                            }, 500);
                        }
                    })
                    .catch((error) => console.log(error));
            } catch (err) {
                console.log(err);
            }
        }
    };

    const validation = (course) => {
        if (!course.category) {
            inputCateRef.current.focus();
            return false;
        } else if (!course.name) {
            inputTitlteRef.current.focus();
            return false;
        } else if (!course.content) {
            inputDescriptionRef.current.focus();
            return false;
        }

        return true;
    };
    const notify = (message, type) => {
        if (type === 'success') {
            return toast.success(message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }

        if (type === 'error') {
            return toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = () => {
        setOpenConfirm(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);

        try {
            axios
                .delete(`http://localhost:3000/api/class/${course.id}`)
                .then((res) => {
                    if (res.status === 200) {
                        setTimeout(() => {
                            setOpen(false);
                            notify('Đóng lớp học thành công!', 'success');
                        }, 500);
                    } else {
                        setTimeout(() => {
                            setOpen(false);
                            notify('Đóng lớp học thất bại!', 'error');
                        }, 500);
                    }
                    setOpenConfirm(false);
                    setConfirmLoading(false);
                })
                .catch((error) => console.log(error));
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpenConfirm(false);
    };

    return (
        <div>
            <div className={cx('alert')}>
                <ToastContainer />
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div>
                {!edit ? (
                    <h1>Tạo một lớp học mới</h1>
                ) : (
                    <div className="flex justify-between">
                        <h1>Cập nhật lớp học</h1>
                        <div style={{ color: '#000' }}>
                            <Popconfirm
                                placement="left"
                                title="Đóng lớp học"
                                description="Bạn có chắc muốn đóng khóa học không!"
                                open={openConfirm}
                                onConfirm={handleOk}
                                okButtonProps={{ loading: confirmLoading }}
                                onCancel={handleCancel}
                            >
                                <Button type="primary" danger onClick={showPopconfirm}>
                                    Đóng lớp học
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2">
                    <div className={cx('theme')}>
                        <h2>Chọn màu nền</h2>
                        <div className={cx('slide')}>
                            <Slider {...settings}>
                                {colors.map((color, index) => (
                                    <BoxColor color={color} key={index} index={index} handleClick={handleClick} />
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className={cx('type')}>
                        <h2>Thể loại ( 20 ký tự )</h2>
                        <input
                            value={inputCate}
                            type="text"
                            placeholder="..."
                            onChange={(input) => {
                                if (inputCate.length < 20) setInputCate(input.target.value);
                                else {
                                    alert('Không thể nhập quá 20 ký tự!');
                                    setInputCate('');
                                }
                            }}
                            ref={inputCateRef}
                        />
                        <button onClick={saveCate}>Lưu</button>
                    </div>
                    <div className={cx('type')}>
                        <h2>Tên lớp học ( 50 ký tự )</h2>
                        <input
                            value={inpuTitle}
                            type="text"
                            placeholder="..."
                            style={{ width: '400px' }}
                            onChange={(input) => {
                                if (inpuTitle.length < 50) setInputTitle(input.target.value);
                                else {
                                    inputTitlteRef.current.focus();
                                    setInputTitle('');
                                }
                            }}
                            ref={inputTitlteRef}
                        />
                        <button onClick={saveTitle}>Lưu</button>
                    </div>
                    <div className={cx('type')}>
                        <h2>Giới thiệu về lớp học ( 100 ký tự )</h2>
                        <input
                            value={inputDescription}
                            type="text"
                            placeholder="..."
                            style={{ width: '600px' }}
                            onChange={(input) => {
                                if (inputDescription.length < 100) setInputDescription(input.target.value);
                                else {
                                    alert('Không thể nhập quá 100 ký tự!');
                                    setInputDescription('');
                                }
                            }}
                            ref={inputDescriptionRef}
                        />
                        <button onClick={saveDescription}>Lưu</button>
                    </div>
                    <div className={cx('type')}>
                        <div className="flex items-center">
                            <h2>Mật khẩu</h2>
                            <SwitchUnstyled
                                style={{ margin: '0 0 10px 20px' }}
                                component={Root}
                                {...label}
                                checked={isPassword}
                                onChange={() => {
                                    setIsPassword(!isPassword);
                                }}
                            />
                        </div>
                        {isPassword && (
                            <div>
                                <input
                                    type="text"
                                    ref={inputPasswordRef}
                                    value={inputPassword}
                                    onChange={(value) => setInputPassword(value.target.value)}
                                />
                                <button
                                    onClick={() => {
                                        setPassword(inputPassword);
                                    }}
                                >
                                    Lưu
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-1">
                    <div
                        className={cx('box')}
                        style={{ background: `linear-gradient(135deg, ${theme[0]}, ${theme[1]}` }}
                    >
                        <div className={cx('category')}>
                            <h3>{course.category || 'Thể loại'}</h3>
                            <div className={cx('author')}>
                                <h4>{course.author.name}</h4>
                                <AvatarCircle size="40px" border="blue" avatar={course.author.avatar} />
                            </div>
                            <h1>{course.name || 'Tên lớp học'}</h1>
                            <p>{course.content || 'Tóm tắt về lớp học'}</p>
                            <Tooltip title="copy" placement="bottom-end">
                                <div className={cx('member')} onClick={() => handleCopyIDClass()}>
                                    <span>{course.id}</span>
                                    <FontAwesomeIcon icon={faCopy} />
                                </div>
                            </Tooltip>
                            <button onClick={() => (edit ? updateClass() : createClass())}>
                                <FontAwesomeIcon icon={faPlus} />
                                {!edit ? 'Tạo mới' : 'Cập nhật'}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <Snackbar
                        open={openSnackBar}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message={'Đã lưu ' + course.id}
                        action={action}
                        sx={{ width: '40%', fontSize: 34 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateClass;
