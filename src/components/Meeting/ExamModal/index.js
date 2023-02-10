import classNames from 'classnames/bind';
import styles from './ExamModal.module.scss';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const cx = classNames.bind(styles);

function ExamModal({ onCloseModal, openExam }) {
    const [heading, setHeading] = useState(null);
    const [isCheck, setCheck] = useState(false);
    const [answerField, setAnswerField] = useState(null);
    const [answers, setAnswerList] = useState([]);
    const [time, setTime] = useState(null)

    const handleAddAnswer = () => {
        if (answerField) {
            setAnswerList([...answers, answerField]);
            setAnswerField('');
        }
    };

    const handleSubmit = () => {
        const data = {
            heading: heading,
            answers: answers,
            time: time,
        };

        onCloseModal();
    };

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
                        className={cx('survey-heading')}
                        variant="standard"
                        inputProps={{ style: { fontSize: 20 } }}
                    />

                    <div className="answer">
                        <TextField
                            id="standard-basic"
                            label="CÂU TRẢ LỜI"
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
                                    {String.fromCharCode(65 + index) + '. ' + ans}
                                </h2>
                            ))}
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <h3>Thời gian: </h3>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            endAdornment={<InputAdornment position="end">Phút</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            onChange={(e) => setTime(e.target.value)}
                            sx={{
                                fontSize: '16px',
                                width: '100px',
                                height: '40px',
                                margin: '20px'
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
