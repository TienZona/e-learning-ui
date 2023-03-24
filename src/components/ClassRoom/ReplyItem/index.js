import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import AvatarCircle from '~/components/Global/AvatarCircle';
import { getFormatDate, getTime } from '~/locallibraries/timestamp';
import styles from './ReplyItem.module.scss';

const cx = classNames.bind(styles);

function ReplyItem({ reply }) {
    const [color, setColor] = useState(null);
    const generateColor = () => {
        return Math.random().toString(16).substr(-6);
    };

    useEffect(() => {
        setColor(generateColor());
    }, []);

    return (
        <div className={cx('wrap')} style={{ backgroundColor: `#${color}` }}>
            <div className={cx('header')}>
                <AvatarCircle size="30px" border="blue" avatar={reply.author.avatar} />
                <div className={cx('infor')}>
                    <h4>{reply.author.name}</h4>
                    <p>{reply.author.email}</p>
                </div>
            </div>
            <div className={cx('content')}>
                <p>{reply.content}</p>
            </div>
            <div className="time">
                <span>{getFormatDate(reply.created_at)}</span>
                <span>{getTime(reply.created_at)}</span>
            </div>
        </div>
    );
}

export default ReplyItem;
