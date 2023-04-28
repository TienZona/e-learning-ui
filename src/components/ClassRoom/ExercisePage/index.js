import styles from './ExercisePage.module.scss';
import classNames from 'classnames/bind';
import Exercise from '~/components/ClassRoom/Exercise';

// timeline
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import previousIcon from '~/assets/icon/previous.png';
import listIcon from '~/assets/icon/list.png';

// // icon local
// import WordIcon from '~/assets/icon/word.png';
// import PDFIcon from '~/assets/icon/pdf.png';
// import DriveIcon from '~/assets/icon/google-drive.png';
import Icon from '~/components/Global/Icon';
import AssignmentIcon from '~/assets/icon/assignment.png';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SubmitExc from '../SubmitExcPage';

const cx = classNames.bind(styles);

function ExercisePage({ course }) {
    const auth = useSelector((state) => state.auth);
    const colors = ['#467fd0', '#42ba96', '#ffc107', '#df4759'];
    const [isTimeLine, setIsTimeLine] = useState(true);
    const [page, setPage] = useState(0);
    const [exercises, setExercises] = useState([]);
    const [exercise, setExercise] = useState(null);

    useEffect(() => {
        const ID_CLASS = window.location.href.split('/').reverse()[0];
        const url =
            auth.email !== course.author.email
                ? `http://localhost:3000/api/classroom/student/exercise`
                : `http://localhost:3000/api/classroom/exercise/${course.id}`;
        axios
            .get(url, {
                params: { email: auth.email, id: ID_CLASS },
            })
            .then((res) => {
                setExercises(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, [auth.email]);

    const checkSubmitExercise = (exercise) => {
        let result = false;
        exercise.students.forEach((student) => {
            if (auth.email === student.email && student.submit) result = true;
        });
        return result;
    };

    const checkLate = (exercise) => {
        // 0 = chua lam, 1 = da lam, 2 = sap den han, 3 = qua han
        let result = 0;
        if (checkSubmitExercise(exercise)) {
            result = 1;
        } else {
            const deadline = new Date(exercise.deadline);
            const now = new Date();
            const temp = deadline.getTime() - now.getTime();
            if (temp < 86400000 && temp > 0) {
                result = 2;
            }

            if (temp >= 86400000) {
                result = 0;
            }

            if (temp <= 0) {
                result = 3;
            }
        }
        return result;
    };

    const handleDateTime = (exercise) => {
        let DateTime = '';
        const check = checkLate(exercise);
        let text = '';
        switch (check) {
            case 0:
                text = 'Chưa làm';
                break;
            case 1:
                text = 'Đã làm';
                break;
            case 2:
                text = 'Sắp đến hạn';
                break;
            case 3:
                text = 'Quá hạn';
                break;
            default:
                text = 'Chưa làm';
        }

        const deadline = new Date(exercise.deadline);
        const day = deadline.getDate();
        const month = deadline.getMonth() + 1;
        const hour = deadline.getHours();
        const minute = deadline.getMinutes();
        if (checkSubmitExercise(exercise)) {
            DateTime = `${hour}:${minute < 10 ? '0' + minute : minute} - ${day} thg ${month} - ${text}`;
        } else {
            DateTime = `${hour}:${minute < 10 ? '0' + minute : minute} - ${day} thg ${month} - ${text}`;
        }
        return DateTime;
    };

    const checkAuthor = () => {
        if (exercise.author.email === auth.email) return true;
        return false;
    };

    return (
        <div className={cx('wrap')}>
            <div className={cx('nav')}>
                {page !== 0 && (
                    <button className={cx('btn-back')} onClick={() => setPage(0)}>
                        <img src={previousIcon} width="50" alt="" />
                    </button>
                )}
                {page !== 0 && checkAuthor() && (
                    <button className={cx('btn-back')} onClick={() => setPage(2)}>
                        <img src={listIcon} width="50" alt="" />
                    </button>
                )}
            </div>

            {!page &&
                (exercises.length > 0 ? (
                    <VerticalTimeline>
                        {auth.email === course.author.email ? (
                            exercises.map((exercise, index) => (
                                <VerticalTimelineElement
                                    key={index}
                                    className="vertical-timeline-element--work"
                                    contentStyle={{ background: colors[1], color: '#fff' }}
                                    contentArrowStyle={{ borderRight: `7px solid  ${colors[1]}` }}
                                    date={handleDateTime(exercise)}
                                    iconStyle={{ background: '#fff', color: '#fff' }}
                                    icon={<Icon icon={AssignmentIcon} />}
                                >
                                    <div
                                        onClick={() => {
                                            setPage(1);
                                            setExercise(exercise);
                                        }}
                                    >
                                        <h3 className="vertical-timeline-element-title">{exercise.title}</h3>
                                        <p>{exercise.content}</p>
                                    </div>
                                </VerticalTimelineElement>
                            ))
                        ) : (
                            exercises.map((exercise, index) => (
                                <VerticalTimelineElement
                                    key={index}
                                    className="vertical-timeline-element--work"
                                    contentStyle={{ background: colors[checkLate(exercise)], color: '#fff' }}
                                    contentArrowStyle={{ borderRight: `7px solid  ${colors[checkLate(exercise)]}` }}
                                    date={handleDateTime(exercise)}
                                    iconStyle={{ background: '#fff', color: '#fff' }}
                                    icon={<Icon icon={AssignmentIcon} />}
                                >
                                    <div
                                        onClick={() => {
                                            setPage(1);
                                            setExercise(exercise);
                                        }}
                                    >
                                        <h3 className="vertical-timeline-element-title">{exercise.title}</h3>
                                        <p>{exercise.content}</p>
                                    </div>
                                </VerticalTimelineElement>
                            ))
                        )}
                    </VerticalTimeline>
                ) : (
                    <h1>Chưa có bài tập nào</h1>
                ))}
            {page === 1 && <Exercise exercise={exercise} setIsTimeLine={setIsTimeLine} />}

            {page === 2 && <SubmitExc exercise={exercise} />}
        </div>
    );
}

export default ExercisePage;
