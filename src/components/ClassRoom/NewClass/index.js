import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Course from '../Course';
import CircularProgress from '@mui/material/CircularProgress';

function NewClass({ courses }) {
    const [listCourse, setListCourse] = useState([]);
    const [isProgress, setIsProgress] = useState(false);
    const listRef = useRef(null);

    useEffect(() => {
        if (!courses) {
            axios
                .get(`http://localhost:3000/api/class`)
                .then((res) => {
                    setListCourse(res.data);
                })
                .catch((err) => console.error(err));
        } else {
            setListCourse(courses);
        }
    }, [courses]);

    window.onscroll = (e) => {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            setIsProgress(true);
            setTimeout(() => {
                setIsProgress(false)
            }, 500)
        }
    };

    return (
        <>
            <div>
                <h1>Lớp học</h1>
            </div>
            <div>
                <div className="grid grid-cols-3 gap-8" ref={listRef}>
                    {listCourse.length ? (
                        listCourse.map((course, index) => (
                            <div className="col-span-1" key={index}>
                                <Course course={course} />
                            </div>
                        ))
                    ) : (
                        <h2>Chưa có lớp học nào</h2>
                    )}
                </div>
            </div>
            <div className='flex justify-center my-10'>
                {
                    isProgress && <CircularProgress />
                }
            </div>
        </>
    );
}

export default NewClass;
