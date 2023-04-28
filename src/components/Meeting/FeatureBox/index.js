import classNames from 'classnames/bind';
import SurveyItem from '../SurveyItem';
import styles from './FeatureBox.module.scss';
import { useState, useEffect, useRef } from 'react';
import QuestionItem from '../QuestionItem';

const cx = classNames.bind(styles);

function FeatureBox({ survey, socket, question }) {
    const [second, setSecond] = useState(true);
    const [event, setEvent] = useState(null);
    const [isItem, setIsItem] = useState(2);
    const timer = useRef(null);

    useEffect(() => {
        if (survey) {
            setSecond(survey.time * 60);
            setEvent('survey');
            setIsItem(1);
            timer.current = setInterval(() => {
                setSecond((prev) => prev - 1);
            }, 1000);
        }
    }, [survey]);

    useEffect(() => {
        if (question) {
            setEvent('exam');
            setIsItem(2);
            setSecond(question.time * 60);
            timer.current = setInterval(() => {
                setSecond((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer.current);
        };
    }, [question])

    useEffect(() => {
        if (second <= 0) {
            clearInterval(timer.current);
        }
    }, [second]);

    return (
        <div className={cx('container')}>
            <button className={cx('btn-close')}></button>
            <div className={cx('box')}>
                <div className={cx('header')}>
                    {(event === 'survey' && <h1>Cuộc Thăm dò</h1>) || (event === 'exam' && <h1>Câu hỏi bài tập</h1>)}
                </div>
                <div className={cx('content')}>
                    {(isItem === 1 &&
                        (second > 0 ? (
                            <SurveyItem survey={survey} second={second} socket={socket} />
                        ) : (
                            <div className={cx('over-time')}>HẾT GIỜ</div>
                        ))) ||
                        (isItem === 2 && <QuestionItem socket={socket} question={question} />)}
                </div>
            </div>
        </div>
    );
}

export default FeatureBox;
