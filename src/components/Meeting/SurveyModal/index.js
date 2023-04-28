import classNames from 'classnames/bind';
import styles from './SurveyModal.module.scss';
import { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useSelector } from 'react-redux';
import axios from 'axios';

const cx = classNames.bind(styles);

function SurveyModal({ onCloseModal, openSurvey, socket, setSurvey }) {
    const auth = useSelector((state) => state.auth);
    const [heading, setHeading] = useState(null);
    const [isCheck, setCheck] = useState(false);
    const [answerField, setAnswerField] = useState(null);
    const [answers, setAnswerList] = useState([]);
    const [time, setTime] = useState(null);

    const headingRef = useRef(null);
    const answerRef = useRef(null);
    const timeRef = useRef(null);

    const handleAddAnswer = () => {
        if (answerField) {
            setAnswerList([...answers, answerField]);
            setAnswerField('');
        }
    };

    const handleSubmit = () => {
        const ROOM_ID = window.location.href.split('/').reverse()[0];
        const listAnswers = answers.map((item) => {
            return {
                content: item,
                vote: [],
            };
        });
        const data = {
            id_room: ROOM_ID,
            auth: auth,
            heading: heading,
            answers: listAnswers,
            created: isCheck,
            time: time,
            create_answer: isCheck,
        };

        if (validator()) {
            axios
                .post(`http://localhost:3000/meet/survey`, data)
                .then((res) => {
                    if (res.status === 200) {
                        socket.emit('survey', res.data);
                        setSurvey(res.data);
                        onCloseModal();
                    }
                })
                .catch((err) => console.log(err));
        }
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

    return (
        <Modal
            open={openSurvey}
            onClose={onCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={cx('modal')}
        >
            <Box className={cx('modal-box')}>
                <div className={cx('modal-header')}>
                    <h3>TẠO MỘT CUỘC THĂM DÒ</h3>
                </div>
                <div className={cx('modal-content')}>
                    <TextField
                        inputRef={headingRef}
                        id="standard-basic"
                        onInputCapture={(e) => setHeading(e.target.value)}
                        label="TIÊU ĐỀ"
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
                                    {index + 1 + '. ' + ans}
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
                            inputRef={timeRef}
                            onChange={(e) => setTime(e.target.value)}
                            sx={{
                                fontSize: '16px',
                                width: '100px',
                                height: '40px',
                                margin: '20px 20px 0 20px',
                            }}
                        />
                    </div>
                    <div className={cx('choice')}>
                        <p>Cho phép người dùng tạo câu trả lời?</p>
                        <div className={cx('list-choice')}>
                            <Button
                                className={!isCheck ? '' : cx('active')}
                                variant="contained"
                                onClick={() => {
                                    setCheck(true);
                                }}
                                color="error"
                            >
                                Cho phép
                            </Button>
                            <Button
                                className={!isCheck ? cx('active') : ''}
                                variant="contained"
                                onClick={() => {
                                    setCheck(false);
                                }}
                                color="error"
                            >
                                Không
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('modal-footer')}>
                    <Button variant="contained" onClick={handleSubmit}>
                        TẠO CUỘC THĂM DÒ
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default SurveyModal;
