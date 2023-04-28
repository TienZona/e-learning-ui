import axios from 'axios';
import { useEffect, useState } from 'react';
import Course from '../Course';
const fetchDataCall = async () => {
    const apiResult = await axios
        .get(`http://localhost:3000/api/class`)
        .then(async (res) => {
            return res.data;
        })
        .catch((err) => console.error(err));
    console.log('fetch data');
    return apiResult;
};

function NewClass({ courses }) {
    const [listCourse, setListCourse] = useState([]);

    useEffect(() => {
        if (!courses) {
            const fetchData = async () => {
                let data = await fetchDataCall();
                setListCourse((prev) => [...prev, ...data]);
            };
            fetchData();
        } else {
            setListCourse(courses);
        }
        console.log(courses);
    }, [courses]);

    return (
        <>
            <div>
                <h1>Lớp học</h1>
            </div>
            <div>
                <div className="grid grid-cols-3 gap-8">
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
        </>
    );
}

export default NewClass;
