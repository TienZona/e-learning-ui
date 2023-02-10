import classNames from 'classnames/bind';
import SurveyItem from '../SurveyItem';
import styles from './FeatureBox.module.scss';
import { useState, useEffect, useRef } from 'react';

const cx = classNames.bind(styles);

function FeatureBox() {
    const [second, setSecond] = useState(true);
    const timer = useRef(null)

    const surveyData = {
        heading: '1 + 1 = ?',
        answers: [
            {
                content: 'Hom nay toi dep trai qua qua la dep trai luony',
                vote: 100,
            },
            {
                content: '2',
                vote: 1,
            }
        ],
        create: false,
        time: 10
    };

    useEffect(() => {
        setSecond(surveyData.time * 60);

        timer.current = setInterval(() => {
            setSecond((prev) => prev - 1)
        }, 1000)


        return () => {
            clearInterval(timer.current);
        };
    }, [])

    useEffect(() => {
        if(second <= 0){
            clearInterval(timer.current)
        }
    }, [second])



    return (
        <div className={cx('container')}>
            <button className={cx('btn-close')}></button>
            <div className={cx('box')}>
                <div className={cx('header')}>
                    <h1>Cuộc Thăm Dò</h1>
                </div>
                <div className={cx('content')}>
                    {
                        second > 0 ? 
                        (
                            <SurveyItem survey={surveyData} second={second}/>
                        ): 
                        (
                            <div className={cx('over-time')}>HẾT GIỜ</div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default FeatureBox;
