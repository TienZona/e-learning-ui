import classNames from 'classnames/bind';
import styles from './AvatarCircle.module.scss';

const cx = classNames.bind(styles);

function AvatarCircle(props) {
    const noneAvatar =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43Q1CTrvRfckF6osuwyT4-TOYrBRWTYSUCc-plMWXrIkbARNsWnCAA67TQE7he2qEJ1Y&usqp=CAU';
    const size = props.size ? props.size : "30px";
    const border = props.border ? props.border : "none";
    return (
        <img
            className={cx('img')}
            style={{ width: size, height: size, borderColor: border }}
            src={props.avatar ? props.avatar : noneAvatar}
            alt="avatar"
        />
    );
}

export default AvatarCircle;
