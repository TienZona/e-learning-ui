import styles from './History.module.scss';
import classNames from 'classnames/bind';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import Icon from '~/components/Global/Icon';
import IconMeet from '~/assets/icon/meet.png';

// material ui
import CircularProgress from '@mui/material/CircularProgress';

// ant design ui
import { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import { formatTime, getFormatDate } from '~/locallibraries/timestamp';
import { formatDateNotYear } from '~/locallibraries/timestamp';

const cx = classNames.bind(styles);

function History({setPage, setMeet}) {
    const [date, setDate] = useState(new Date());
    const [isProgress, setIsProgress] = useState(false);
    const [meets, setMeets] = useState([]);

    useEffect(() => {
        const id_class = window.location.href.split('/').reverse()[0];

        setIsProgress(true);
        console.log(date);
        axios
            .get(`http://localhost:3000/meet/${id_class}`, {
                params: {
                    date: date,
                },
            })
            .then((res) => {
                setTimeout(() => {
                    setIsProgress(false);
                    setMeets((prev) => [...res.data]);
                }, 1000);
            })
            .catch((err) => console.log(err));
    }, [date]);

    const handleNext = () => {
        setDate(new Date(date.setMonth(date.getMonth() + 1)));
    };

    const handlePrevious = (value) => {
        setDate(new Date(date.setMonth(date.getMonth() - 1)));
    };

    return (
        <div className={cx('wrap')}>
            <div className={cx('infor')}>
                <div className={cx('icon')} onClick={() => handlePrevious()}>
                    <LeftOutlined />
                </div>
                <span className="px-5">
                    {date.getFullYear()}, Thg {date.getMonth() + 1}
                </span>
                <div className={cx('icon')} onClick={() => handleNext()}>
                    <RightOutlined />
                </div>
            </div>
            <div className="flex justify-center items-center">
                {isProgress ? (
                    <CircularProgress />
                ) : meets.length === 0 ? (
                    <h1>Chưa có buổi học nào</h1>
                ) : (
                    <VerticalTimeline>
                        {meets.map((meet) => (
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: '#57ac4f', color: '#fff' }}
                                contentArrowStyle={{ borderRight: `7px solid #57ac4f` }}
                                date={getFormatDate(meet.start)}
                                iconStyle={{ background: '#fff', color: '#fff' }}
                                icon={<Icon icon={IconMeet} />}
                            >
                                <div onClick={() => {
                                    setMeet(meet)
                                    setPage(false);
                                }}>
                                    <h3 className="vertical-timeline-element-title">Buổi học ngày {formatDateNotYear(meet.start)}</h3>
                                    <p>Bắt đầu lúc { formatTime(meet.start)}</p>
                                </div>
                            </VerticalTimelineElement>
                        ))}
                    </VerticalTimeline>
                )}
            </div>
        </div>
    );
}

export default History;
