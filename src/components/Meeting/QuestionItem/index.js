import { useEffect, useRef, useState } from 'react';
import styles from './QuestionItem.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AvatarCircle from '~/components/Global/AvatarCircle';

const cx = classNames.bind(styles);

function QuestionItem({ question, socket }) {
    const auth = useSelector((state) => state.auth);
    const [isSubmit, setIsSubmit] = useState(false);
    const [second, setSecond] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [ans, setAns] = useState(null);
    const timer = useRef(null);

    useEffect(() => {
        setIsSubmit(false)
        if (question) {
            setSecond(question.time * 60);
        }
    }, [question]);

    const renderMinute = (second) => {
        const result = Math.floor(second / 60);
        return result < 10 ? '0' + result : result;
    };

    const renderSecond = (second) => {
        const result = Math.floor(second % 60);
        return result < 10 ? '0' + result : result;
    };

    useEffect(() => {
        if (question) {
            timer.current = setInterval(() => {
                setSecond((prev) => prev - 1);
            }, 1000);

            if (second <= 0) {
                clearInterval(timer.current);
            }

            return () => {
                clearInterval(timer.current);
            };
        }
        console.log(question);
    }, [question, second]);

    const submitAns = () => {
        if (ans) {
            setIsSubmit(true);
            const newAnswers = question.answers.map((item) => {
                if (item.content === ans) {
                    item.vote.push({
                        name: auth.name,
                        email: auth.email,
                        avatar: auth.avatar,
                        voted_at: second,
                    });
                }
                return item;
            });
            console.log(Date.now());
            const data = {
                _id: question._id,
                answers: newAnswers,
            };
            socket.emit('vote_answer', data);
        }
    };

    const formatBeforTime = (time) => {
        const minute = parseInt(time / 60);
        const second = parseInt(time % 60);
        return minute + ':' + second;
    };

    return (
        <div className={cx('wrap')}>
            {question &&
                (question.author.email === auth.email ? (
                    <div>
                        <div
                            className={`text-center my-3 text-3xl leading-6 ${
                                second < 60 ? 'text-rose-700' : 'text-neutral-50'
                            }`}
                        >
                            <span>{renderMinute(second) + ':' + renderSecond(second)}</span>
                        </div>
                        <div className="flex items-center">
                            <QuestionCircleOutlined />
                            <h1 className="text-3xl mx-2 text-neutral-50">{question.heading}</h1>
                        </div>
                        <div className="p-4">
                            {question.answers.map((item, index) => (
                                <div key={index}>
                                    <span>{String.fromCharCode(index + 65) + '. ' + item.content}</span>
                                    <div className="p-3">
                                        {item.vote.map((mem, index) => (
                                            <div className="flex justify-between">
                                                <div className='flex items-center'>
                                                    <AvatarCircle avatar={mem.avatar} size="24px" border="red" />
                                                    <h1 className="text-amber-200 flex justify-between" key={index}>
                                                        {mem.name}
                                                    </h1>
                                                </div>
                                                <span>{formatBeforTime(mem.voted_at)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : second ? (
                    <div>
                        <div
                            className={`text-center my-3 text-3xl leading-6 ${
                                second < 60 ? 'text-rose-700' : 'text-neutral-50'
                            }`}
                        >
                            <span>{renderMinute(second) + ':' + renderSecond(second)}</span>
                        </div>
                        <div className="flex items-center">
                            <QuestionCircleOutlined />
                            <h1 className="text-3xl mx-2 text-neutral-50">{question.heading}</h1>
                        </div>
                        <div className={cx('question_list')}>
                            {question.answers.map((item, index) => (
                                <div
                                    className={cx('question_item', isFocus === index && 'focus')}
                                    key={index}
                                    onClick={() => {
                                        setAns(item.content);
                                        setIsFocus(index);
                                    }}
                                >
                                    {String.fromCharCode(index + 65) + '. ' + item.content}
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            {!isSubmit && (
                                <button className={cx('btn-submit')} onClick={() => submitAns()}>
                                    Trả lời
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={cx('time-out')}>
                        <h1>Hết Giờ!!</h1>
                    </div>
                ))}
        </div>
    );
}

export default QuestionItem;
