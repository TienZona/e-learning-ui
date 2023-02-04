import classNames from 'classnames/bind';
import styles from './ItemChat.module.scss';

import AvatarCicle from '~/components/Global/AvatarCircle';

const cx = classNames.bind(styles);

function ItemChat(props) {
    return (
        <div className={cx('wrap')}>
            <div className={cx('item-chat-left')}>
                <AvatarCicle size="32px" border="#00d0ff" avatar={props.avatar} />
                <span className={cx('time')}>{props.time}</span>
            </div>
            <div className={cx('item-chat-right')}>
                <span className={cx('name')}>
                    {props.auther}
                    <span className={cx('content')}>{props.content}</span>
                </span>
            </div>
        </div>
    );
}

export default ItemChat;
