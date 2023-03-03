import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import AvatarCircle from '~/components/Global/AvatarCircle';
import styles from './Course.module.scss';

const cx = classNames.bind(styles);

function Course({ course }) {
    const id = '123';
    return (
        <div
            className={cx('box')}
            style={{ background: `linear-gradient(135deg, ${course.color[0]}, ${course.color[1]}` }}
        >
            <div className={cx('category')}>
                <h3>{course.category}</h3>
                <div className={cx('author')}>
                    <h4>{course.author.name}</h4>
                    <AvatarCircle size="40px" border="blue" avatar={course.author.avatar} />
                </div>
                <h1>{course.title}</h1>
                <p>{course.content}</p>
                <div className={cx('member')}>
                    <span>15</span>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <Link to={'/classroom/' + id}>
                    <button>
                        <FontAwesomeIcon icon={faPlus} />
                        Tham gia
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Course;
