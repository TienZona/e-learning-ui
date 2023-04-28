import classNames from 'classnames/bind';
import styles from './SurveyItem.module.scss';
import { CChart } from '@coreui/react-chartjs';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

// material ui
import Button from '@mui/material/Button';
import PieChartIcon from '@mui/icons-material/PieChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

const cx = classNames.bind(styles);

const ariaLabel = { 'aria-label': 'description' };

function SurveyItem({ survey, second, socket }) {
    const listAnswerMember = useRef(null);
    const [isVote, setIsVote] = useState(false);
    const auth = useSelector((state) => state.auth);
    const [openChart, setOpenChart] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [inputValue, setInputValue] = useState(null);

    const voteNumber = survey.answers.map((item) => {
        return item.vote.length;
    });

    const voteContent = survey.answers.map((item) => {
        return item.content;
    });

    const handleSubmit = () => {
        axios
            .post(`http://localhost:3000/meet/survey/create_ans`, {
                _id: survey._id,
                content: inputValue,
            })
            .then((res) => {
                if (res.status === 200) {
                    socket.emit('new-answer', survey._id);
                    survey.answers.push({
                        content: inputValue,
                        vote: [],
                    });
                }
            });
        setOpenModal(false);
    };

    useEffect(() => {
        listAnswerMember.current = survey.answers.sort((a, b) => b.vote - a.vote);
        console.log(listAnswerMember);
    }, [survey.answers, socket]);

    const renderMinute = (second) => {
        const result = Math.floor(second / 60);
        return result < 10 ? '0' + result : result;
    };

    const renderSecond = (second) => {
        const result = Math.floor(second % 60);
        return result < 10 ? '0' + result : result;
    };

    const submitVote = (item) => {
        const newAnswers = survey.answers.map((ans) => {
            if (ans.content === item.content) {
                ans.vote.push({
                    name: auth.name,
                    email: auth.email,
                    avatar: auth.avatar,
                    voted_at: Date.now()
                });
            }
            return ans;
        });
        const data = {
            _id: survey._id,
            answers: newAnswers,
        };
        socket.emit('vote', data);
    };

    return (
        <div className={cx('wrapper')}>
            {survey.time ? (
                <div className={cx('timer')}>
                    <span>{renderMinute(second) + ':' + renderSecond(second)}</span>
                </div>
            ) : (
                <div></div>
            )}
            <div className={cx('heading')}>{survey.heading}</div>
            {!openChart ? (
                <>
                    <div className={cx('list')}>
                        {survey.answers ? (
                            survey.answers.map((item, index) => (
                                <div key={index} className={cx('item')}>
                                    <span className={cx('quantity')}>{item.vote.length}</span>
                                    <p className={cx('content')}>{item.content}</p>
                                    <div className={cx('voting')}>
                                        <div className={cx('avatar-group')}>
                                            <AvatarGroup max={4}>
                                                {item.vote.map((user, index) => (
                                                    <Avatar key={index} alt={user.name} src={user.avatar} />
                                                ))}
                                            </AvatarGroup>
                                        </div>
                                        {!isVote && (
                                            <Button
                                                variant=""
                                                color="secondary"
                                                className={cx('voting-btn')}
                                                onClick={() => {
                                                    submitVote(item);
                                                    setIsVote(true);
                                                }}
                                            >
                                                VOTE
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3>Chưa có câu trẳ lời nào</h3>
                        )}
                    </div>
                    {survey.create_answer && (
                        <Button
                            variant="contained"
                            onClick={() => setOpenModal(true)}
                            sx={{ fontSize: '14px', backgroundColor: 'green' }}
                        >
                            Thêm câu trả lời
                        </Button>
                    )}
                </>
            ) : (
                <div className={cx('chart')}>
                    <CChart
                        type="doughnut"
                        data={{
                            labels: voteContent,
                            datasets: [
                                {
                                    backgroundColor: [
                                        '#FFFF00',
                                        '#FF3300',
                                        '#33CC00',
                                        '#0066FF',
                                        '#6600CC',
                                        '#FF6600',
                                        '#000033',
                                        '#99FF00',
                                    ],
                                    data: voteNumber,
                                },
                            ],
                        }}
                        options={{
                            tooltips: {
                                callbacks: {
                                    title: function (tooltipItem, data) {
                                        return data['labels'][tooltipItem[0]['index']];
                                    },
                                    label: function (tooltipItem, data) {
                                        return data['datasets'][0]['data'][tooltipItem['index']];
                                    },
                                    afterLabel: function (tooltipItem, data) {
                                        var dataset = data['datasets'][0];
                                        var percent = Math.round(
                                            (dataset['data'][tooltipItem['index']] / dataset['_meta'][0]['total']) *
                                                100,
                                        );
                                        return '(' + percent + '%)';
                                    },
                                },
                                backgroundColor: '#FFF',
                                titleFontSize: 16,
                                titleFontColor: '#0066ff',
                                bodyFontColor: '#000',
                                bodyFontSize: 14,
                                displayColors: false,
                            },
                        }}
                    />
                </div>
            )}

            <div className={cx('footer')}>
                {openChart ? (
                    <div className={cx('button-chart')} onClick={() => setOpenChart(false)}>
                        <ArrowBackIcon />
                        <h1>Back</h1>
                    </div>
                ) : (
                    <div className={cx('button-chart')} onClick={() => setOpenChart(true)}>
                        <h3>CHART</h3>
                        <PieChartIcon />
                    </div>
                )}
            </div>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={cx('modal')}
            >
                <div className={cx('modal-box')}>
                    <Input
                        placeholder="Nhập câu trả lời"
                        sx={{ fontSize: '16px', width: '100%', marginRight: '12px' }}
                        inputProps={ariaLabel}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button variant="contained" onClick={() => handleSubmit()} sx={{ fontSize: '14px' }}>
                        THÊM
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default SurveyItem;
