import classNames from 'classnames/bind';
import AvatarCircle from '~/components/Global/AvatarCircle';
import styles from './ListOnline.module.scss';

const cx = classNames.bind(styles);

function ListOnline() {
    const users = [
        {
            name: 'Chung Phat Tien B1910000 TienZona',
            avatar: '',
        },
        {
            name: 'Chung Phat Tien',
            avatar: '',
        },
        {
            name: 'Chung ',
            avatar: '',
        },
        {
            name: 'TienZona',
            avatar: '',
        },
        {
            name: 'Chung Phat ',
            avatar: '',
        },
    ];

    return (
        <div className={cx('wrap')}>
            <h3>Giáo viên</h3>
            <div className={cx('item')}>
                <div className={cx('avatar')}>
                    <AvatarCircle size="30px" avatar={users[0].avatar} border="blue" />
                    <span></span>
                </div>
                <h2>{users[0].name}</h2>
            </div>

            <h3>Bạn học đang online</h3>
            {users.map((user) => (
                <div className={cx('item')}>
                    <div className={cx('avatar')}>
                        <AvatarCircle size="30px" avatar={user.avatar} border="blue" />
                        <span></span>
                    </div>
                    <h2>{user.name}</h2>
                </div>
            ))}
        </div>
    );
}

export default ListOnline;
