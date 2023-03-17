import Course from '../Course';

function StudyClass() {
    const listCourse = [
        
      
    ];

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
