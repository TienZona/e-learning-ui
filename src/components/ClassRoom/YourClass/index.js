import styles from './YourClass.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Course from '../Course';
import { useSelector } from 'react-redux';
import CreateClass from '../CreateClass';

const cx = classNames.bind(styles);

function YourClass() {
    const [courses, setCourses] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [classID, setClassID] = useState(null);
    const author = useSelector((state) => state.auth);

    useEffect(() => {
        try {
            axios
                .get('http://localhost:3000/api/class/author/' + author.email)
                .then((res) => {
                    setCourses((prev) => [...prev, ...res.data]);
                })
                .catch((error) => console.log(error));
        } catch (err) {
            console.log(err);
        }
    }, [author.email]);

    return (
        <>
            {isEdit ? (
                <CreateClass classID={classID} edit={isEdit} />
            ) : (
                <>
                    <div>
                        <h1 className={cx('heading')}>Lớp học của bạn</h1>
                    </div>
                    <div>
                        <div className="grid grid-cols-3 gap-8">
                            {courses.length ? (
                                courses.map((course, index) => (
                                    <div
                                        className="col-span-1"
                                        key={index}
                                        onClick={() => {
                                            setIsEdit(true);
                                            setClassID(course.id);
                                        }}
                                    >
                                        <Course course={course} className={cx('wrap')} />
                                    </div>
                                ))
                            ) : (
                                <h2>Chưa có lớp học nào</h2>
                            )}
                                
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default YourClass;
