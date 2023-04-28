import classNames from 'classnames/bind';
import styles from './ExamModal.module.scss';
import {  useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ExamModal({ onCloseModal, openExam, setQuestion, socket }) {
    const auth = useSelector((state) => state.auth);
    const [heading, setHeading] = useState('');
    const [answerField, setAnswerField] = useState('');
    const [answers, setAnswerList] = useState([]);
    const [time, setTime] = useState(0);
    const headingRef = useRef(null);
    const answerRef = useRef(null);
    const timeRef = useRef(null);

    const handleAddAnswer = () => {
        if (answerField) {
            setAnswerList([...answers, {
                content: answerField,
                vote: []
            }]);
            setAnswerField('');
        }
    };

    const handleSubmit = () => {
        const ROOM_ID = window.location.href.split('/').reverse()[0];

        const data = {
            id_room: ROOM_ID,
            author: {
                email: auth.email,
                name: auth.name,
                avatar: auth.avatar
            },
            heading: heading,
            answers: answers,
            time: time,
        };
        if (validator()) {
            axios
                .post(`http://localhost:3000/meet/question`, data)
                .then((res) => {
                    setQuestion(data);
                    socket.emit('question', res.data);
                    clearAns();
                    console.log(Date.now())
                    onCloseModal(true)
                })
                .catch((err) => console.log(err));
        }

        // onCloseModal();
    };

    const validator = () => {
        if (!heading) {
            headingRef.current.focus();
            return false;
        } else {
            if (!answers.length) {
                answerRef.current.focus();
                return false;
            } else {
                if (!time) {
                    timeRef.current.focus();
                    return false;
                }
            }
        }
        return true;
    };

    const clearAns = () => {
        setAnswerList([]);
        setHeading('');
    }

    return (
        <Modal
            open={openExam}
            onClose={onCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={cx('modal')}
        >
            <Box className={cx('modal-box')}>
                <div className={cx('modal-header')}>
                    <h3>TẠO MỘT CÂU HỎI</h3>
                </div>
                <div className={cx('modal-content')}>
                    <TextField
                        id="standard-basic"
                        onInputCapture={(e) => setHeading(e.target.value)}
                        label="TIÊU ĐỀ"
                        inputRef={headingRef}
                        value={heading}
                        className={cx('survey-heading')}
                        variant="standard"
                        inputProps={{ style: { fontSize: 20 } }}
                    />

                    <div className="answer">
                        <TextField
                            id="standard-basic"
                            label="CÂU TRẢ LỜI"
                            inputRef={answerRef}
                            className={cx('survey-heading')}
                            variant="standard"
                            value={answerField}
                            inputProps={{ style: { fontSize: 20 } }}
                            onChange={(e) => setAnswerField(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            className="float-right"
                            onClick={() => handleAddAnswer()}
                        >
                            Thêm
                        </Button>
                    </div>
                    <div className={cx('list-answer')}>
                        <span>Danh sách câu trả lời</span>
                        <div className={cx('list')}>
                            {answers.map((ans, index) => (
                                <h2 className={cx('list-item')} key={index}>
                                    {String.fromCharCode(65 + index) + '. ' + ans.content}
                                </h2>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h3>Thời gian: </h3>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            endAdornment={<InputAdornment position="end">Phút</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            value={time}
                            inputRef={timeRef}
                            onChange={(e) => setTime(e.target.value)}
                            sx={{
                                fontSize: '16px',
                                width: '100px',
                                height: '40px',
                                margin: '20px',
                            }}
                        />
                    </div>
                </div>
                <div className={cx('modal-footer')}>
                    <Button variant="contained" onClick={handleSubmit}>
                        TẠO CÂU HỎI
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ExamModal;
