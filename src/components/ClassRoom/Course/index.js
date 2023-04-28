import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import AvatarCircle from '~/components/Global/AvatarCircle';
import styles from './Course.module.scss';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const cx = classNames.bind(styles);

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    backgroundColor: '#fff',
    border: '10px solid #a96666',
    borderRadius: 10,
    p: 4,
};

function Course({ course }) {
    const [open, setOpen] = useState(false);
    const auth = useSelector((state) => state.auth);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const checkJoinedCourse = () => {
        var result = false;
        if (course.author.email === auth.email) return true;
        course.member.forEach((member) => {
            if (member.email === auth.email) {
                result = true;
            }
        });
        return result;
    };

    const joinClass = () => {
        if (course.is_password) {
            setOpen(true);
        } else {
            fetchJoinClass(course);
        }
    };

    const fetchJoinClass = (course) => {
        const user = {
            email: auth.email,
            name: auth.name,
            avatar: auth.avatar,
        };

        course.member = [...course.member, user];

        try {
            axios
                .put(`http://localhost:3000/api/class/join/${course.id}`, course)
                .then((res) => {
                    if (res.status === 200) {
                        setTimeout(() => {
                            setOpen(false);
                            notify('Bạn đã tham gia lớp học!', 'success');
                        }, 500);
                    } else {
                        setTimeout(() => {
                            setOpen(false);
                            notify('Tham gia thất bại!', 'error');
                        }, 500);
                    }
                    console.log(res);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
            setTimeout(() => {
                setOpen(false);
                notify('Tham gia thất bại!', 'error');
            }, 500);
        }
    };

    const login = () => {
        if (inputValue === course.password) {
            fetchJoinClass(course);
        } else {
            setInputValue('');
            inputRef.current.focus();
            inputRef.current.style.border = '1px solid red';
            alert('Sai mat khau!');
        }
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

    return (
        <div
            className={cx('box')}
            style={{ background: `linear-gradient(135deg, ${course.theme[0]}, ${course.theme[1]}` }}
        >
            <div className={cx('category')}>
                <h3>{course.category}</h3>
                <div className={cx('author')}>
                    <h4>{course.author.name}</h4>
                    <AvatarCircle size="40px" border="blue" avatar={course.author.avatar} />
                </div>
                <h1>{course.name}</h1>
                <p>{course.content}</p>
                <div className={cx('member')}>
                    <span>{course.member.length}</span>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                {!checkJoinedCourse() ? (
                    <button onClick={() => joinClass()}>
                        <FontAwesomeIcon icon={faPlus} />
                        Tham gia
                    </button>
                ) : (
                    <Link to={'/classroom/' + course.id}>
                        <button>
                            <FontAwesomeIcon icon={faPlus} />
                            vào lớp
                        </button>
                    </Link>
                )}
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1 className="text-center" style={{ color: '#000', marginBottom: 15, fontSize: 18 }}>
                        Lớp học cần mật khẩu
                    </h1>
                    <div className="flex justify-around">
                        <input
                            type="text"
                            style={{ border: '1px solid #ccc', padding: '3px 10px' }}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            ref={inputRef}
                        />
                        <Button variant="contained" onClick={() => login()}>
                            Tham gia
                        </Button>
                    </div>
                </Box>
            </Modal>
            <div className={cx('alert')}>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Course;
