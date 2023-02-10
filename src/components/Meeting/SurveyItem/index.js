import classNames from 'classnames/bind';
import styles from './SurveyItem.module.scss';
import Button from '@mui/material/Button';
import { CChart } from '@coreui/react-chartjs';
import { useEffect, useRef, useState } from 'react';
import PieChartIcon from '@mui/icons-material/PieChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

const cx = classNames.bind(styles);

const ariaLabel = { 'aria-label': 'description' };

function SurveyItem({ survey, second }) {
    const listAnswer = useRef(null);
    const [openChart, setOpenChart] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [inputValue, setInputValue] = useState(null)

    const voteNumber = survey.answers.map((item) => {
        return item.vote;
    });

    const voteContent = survey.answers.map((item) => {
        return item.content;
    });

    const handleSubmit = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        listAnswer.current = survey.answers.sort((a, b) => b.vote - a.vote);
    }, [survey]);

    const renderMinute = (second) => {
        const result = Math.floor(second / 60);
        return result < 10 ? '0' + result : result;
    };

    const renderSecond = (second) => {
        const result = Math.floor(second % 60);
        return result < 10 ? '0' + result : result;
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
                        {listAnswer.current ? (
                            listAnswer.current.map((item, index) => (
                                <div key={index} className={cx('item')}>
                                    <span className={cx('quantity')}>{item.vote}</span>
                                    <p className={cx('content')}>{item.content}</p>
                                    <div className={cx('voting')}>
                                        <div className={cx('avatar-group')}>
                                            <AvatarGroup max={4}>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFLvVixHKSuVD47xKe9TA83JzjoAUQOwcmGv_ylgOXfGfPFeXwwTDb2O_joF5vBybgYUk&usqp=CAU"
                                                />
                                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                            </AvatarGroup>
                                        </div>
                                        <Button variant="" color="secondary" className={cx('voting-btn')}>
                                            VOTE
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3>Chưa có câu trẳ lời nào</h3>
                        )}
                    </div>
                    <Button
                        variant="contained"
                        onClick={() => setOpenModal(true)}
                        sx={{ fontSize: '14px', backgroundColor: 'green' }}
                    >
                        Thêm câu trả lời
                    </Button>
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
                    <Button variant="contained" onClick={handleSubmit} sx={{ fontSize: '14px' }}>
                        THÊM
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default SurveyItem;
