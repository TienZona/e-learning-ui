import classNames from 'classnames/bind';
import styles from './Member.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faUsers } from '@fortawesome/free-solid-svg-icons';
import AvatarCircle from '~/components/Global/AvatarCircle';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Member() {
    const [member, setMember] = useState([]);
    const [author, setAuthor] = useState(null);

    const generateColor = () => {
        return Math.random().toString(16).substr(-6);
    };

    useEffect(() => {
        const ID_CLASS = window.location.href.split('/').reverse()[0];

        try {
            axios
                .get(`http://localhost:3000/api/class/member/${ID_CLASS}`)
                .then((res) => {
                    setMember((prev) => [...prev, ...res.data.member]);
                    setAuthor(res.data.author);
                    console.log(res.data.author);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className={cx('wrap')}>
            {author && (
                <>
                    <div className={cx('heading')}>
                        <h1>Giáo viên</h1>
                        <FontAwesomeIcon icon={faUserGraduate} />
                    </div>
                    <div className={cx('item')} style={{ backgroundColor: '#333' }}>
                        <AvatarCircle size="50px" avatar={author.avatar} border="red" />
                        <div>
                            <h2>{author.name}</h2>
                            <span>{author.email}</span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className={cx('heading')}>
                            <h1>Học sinh</h1>
                            <FontAwesomeIcon icon={faUsers} />
                        </div>
                        <div className={cx('heading')}>
                            <h1>{member.length}</h1>
                            <FontAwesomeIcon icon={faUsers} />
                        </div>
                    </div>
                </>
            )}
            {member.length ? (
                member.map((user, index) => (
                    <div className={cx('item')} style={{ backgroundColor: '#' + generateColor() }} key={index}>
                        <AvatarCircle size="50px" avatar={user.avatar} border="red" />
                        <div>
                            <h2>{user.name}</h2>
                            <span>{user.email}</span>
                        </div>
                    </div>
                ))
            ) : (
                <h1>Chưa có thành viên nào </h1>
            )}
        </div>
    );
}

export default Member;
