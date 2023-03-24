import { useState, useEffect } from 'react';
import Course from '../Course';
import axios from 'axios';
import { useSelector } from 'react-redux';

function StudyClass() {
    const [listCourse, setListCourse] = useState([]);
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const ID_CLASS = window.location.href.split('/').reverse()[0];
        console.log(ID_CLASS);
        try {
            axios
                .get(`http://localhost:3000/api/class/studying/${auth.email}`)
                .then((res) => {
                    setListCourse((prev) => [...prev, ...res.data]);
                    console.log(res.data)
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }, [auth.email]);

    return (
        <>
            <div>
                <h1>Lớp học của bạn</h1>
            </div>
            <div>
                <div className="grid grid-cols-3 gap-8">
                    {listCourse.map((course, index) => (
                        <div className="col-span-1" key={index}>
                            <Course course={course} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default StudyClass;
