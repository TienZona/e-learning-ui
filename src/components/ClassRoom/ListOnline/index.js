import classNames from 'classnames/bind';
import AvatarCircle from '~/components/Global/AvatarCircle';
import styles from './ListOnline.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function ListOnline() {
    const [users, setUsers] = useState([]);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const ID_CLASS = window.location.href.split('/').reverse()[0];
        axios.get(`http://localhost:3000/api/class/member/${ID_CLASS}`)
            .then(res => {
                setUsers(res.data.member)
                setAuthor(res.data.author)
            })
    }, []);

    return (
        <div className={cx('wrap')}>
            <h3>Giáo viên</h3>
            {author && (
                <div className={cx('item')}>
                    <div className={cx('avatar')}>
                        <AvatarCircle size="30px" avatar={author.avatar} border="aqua" />
                        <span></span>
                    </div>
                    <h2>{author.name}</h2>
                </div>
            )}

            <h3>Thành viên</h3>
            {users &&
                users.map((user, index) => (
                    <div className={cx('item')} key={index}>
                        <div className={cx('avatar')}>
                            <AvatarCircle size="30px" avatar={user.avatar} border="aqua" />
                            <span></span>
                        </div>
                        <h2>{user.name}</h2>
                    </div>
                ))}
        </div>
    );
}

export default ListOnline;
