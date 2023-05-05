import { useEffect, useState } from 'react';
import styles from './HistoryItem.module.scss';
import classNames from 'classnames/bind';
import RecordJoin from '../RecordJoin';

// material ui
import CircularProgress from '@mui/material/CircularProgress';
import RecordCom from '../RecordCom';

import previous from '~/assets/icon/previous.png';
import { getFormatDate, getTime } from '~/locallibraries/timestamp';
import axios from 'axios';
import RecordSurvey from '../RecordSurvey';
import RecordQuestion from '../RecordQuestion';

const cx = classNames.bind(styles);

function HistoryItem({ setPage, meet }) {
    const [active, setActive] = useState('item1');
    const [isProgress, setIsProgress] = useState(false);
    const [course, setCourse] = useState(null);

    useEffect(() => {
        setIsProgress(true);
        setTimeout(() => {
            setIsProgress(false);
        }, 1000);
    }, [active]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/class/${meet.id_class}`)
            .then((res) => {
                setCourse(res.data);
            })
            .catch((err) => console.log(err));
    }, [meet]);
    return (
        <div className={cx('wrap')}>
            <div className={cx('btn-back')} onClick={() => setPage(true)}>
                <img src={previous} alt="" />
            </div>
            <div className={cx('info') + ' flex justify-around mb-3'}>
                <h2 className={cx('title-1')}>Buổi học ngày {getFormatDate(meet.start)}</h2>
                <div className="flex">
                    <h3 className={cx('title-1')}>
                        Bắt đầu <span className="mx-3 text-cyan-400">{getTime(meet.start)}</span>
                    </h3>
                    {meet.end && (
                        <h3 className={cx('title-1')}>
                            Kết thúc <span className="mx-3 text-red-400">{getTime(meet.end)}</span>
                        </h3>
                    )}
                </div>
            </div>
            <div className={cx('navbar')}>
                <div className={cx('item', active === 'item1' && 'active')} onClick={() => setActive('item1')}>
                    Tham gia
                    <span></span>
                </div>
                <div className={cx('item', active === 'item2' && 'active')} onClick={() => setActive('item2')}>
                    Tin nhắn
                    <span></span>
                </div>
                <div className={cx('item', active === 'item3' && 'active')} onClick={() => setActive('item3')}>
                    Thăm dò
                    <span></span>
                </div>
                <div className={cx('item', active === 'item4' && 'active')} onClick={() => setActive('item4')}>
                    Câu hỏi
                    <span></span>
                </div>
            </div>
            <div>
                {isProgress ? (
                    <div className="flex justify-center items-center my-20">
                        <CircularProgress />
                    </div>
                ) : (
                    (active === 'item1' && <RecordJoin course={course} meet={meet} />) ||
                    (active === 'item2' && <RecordCom meet={meet} />) ||
                    (active === 'item3' && <RecordSurvey meet={meet} />) ||
                    (active === 'item4' && <RecordQuestion meet={meet} />)
                )}
            </div>
        </div>
    );
}

export default HistoryItem;
