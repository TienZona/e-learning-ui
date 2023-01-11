import classNames from 'classnames/bind';
import AvatarCircle from '~/components/Global/AvatarCircle';
import styles from './ItemUser.module.scss';

const cx = classNames.bind(styles);

function ItemUser(props) {
    return (
        <div className={cx('box')}>
            <AvatarCircle avatar={props.user.avatar} border="#fff" size="50px" />
            <div className={cx('infor')}>
                <h2>{props.user.name}</h2>
                <span>{props.user.email}</span>
            </div>
        </div>
    );
}

export default ItemUser;
