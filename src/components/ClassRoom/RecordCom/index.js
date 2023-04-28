import styles from './RecordCom.module.scss';
import classNames from 'classnames/bind';
import AvatarCircle from '~/components/Global/AvatarCircle';
import { formatTime } from '~/locallibraries/timestamp';

const cx = classNames.bind(styles);

function RecordCom({ meet }) {;

    return (
        <div className={cx('wrap')}>
            <h1 className="mb-5">Tin nhắn cuộc họp</h1>
            <div className={cx('chat-list')}>
                {meet.messages.map((message, index) => (
                    <div className={cx('chat-item')} key={index}>
                        <div className={cx('author')}>
                            <div className="flex justify-between items-center">
                                <div className="flex">
                                    <AvatarCircle avatar={message.auth.avatar} size="40px" border="aqua" />

                                    <div className="mx-3">
                                        <h3 className="text-cyan-400">{message.auth.name}</h3>
                                        <span className={cx('title-3') + ' text-cyan-100'}>{message.auth.email}</span>
                                    </div>
                                </div>
                                <div>
                                    Lúc
                                    <span className="mx-3 text-end text-cyan-400">
                                        {formatTime(message.created_at)}
                                    </span>
                                </div>
                            </div>
                            <p className="px-6">{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecordCom;
