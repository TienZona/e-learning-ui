import AvatarCircle from '~/components/Global/AvatarCircle';
import styles from './SubmitExcPage.module.scss';
import classNames from 'classnames/bind';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatDateNotYear, formatTime } from '~/locallibraries/timestamp';

const cx = classNames.bind(styles);

function SubmitExc({ exercise }) {
    const [hrefURL, setHref] = useState(null);

    const downloadFile = (name) => {
        axios({
            url: 'http://localhost:3000/download',
            method: 'GET',
            responseType: 'blob',
            params: {
                fileName: name,
            },
        }).then((response) => {
            const href = URL.createObjectURL(response.data);
            setHref(href);
            console.log(response)
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    };

    return (
        <div className={cx('wrap')}>
            <h1 className={cx('heading')}>Sinh viên nhận bài tập</h1>
            <div className={cx('list')}>
                {exercise.students.length > 0 ? (
                    exercise.students.map((student, index) => (
                        <div className={cx('item')} key={index}>
                            <div className={cx('info')}>
                                <div className={cx('user')}>
                                    <AvatarCircle size="40px" border="aqua" avatar={student.avatar} />
                                    <div className="ml-3">
                                        <h1>{student.name}</h1>
                                        <p>{student.email}</p>
                                    </div>
                                </div>
                                <div className={cx('other')}>
                                    {student.submit ? (
                                        <>
                                            <span className="text-green-400 float-right">Đã nộp</span>
                                            <div>
                                                <span className="mr-2">Lúc {formatTime(student.submit_time) }</span>
                                                <span className="ml-2">{formatDateNotYear(student.submit_time)}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <span className="text-blue-400">Chưa nộp</span>
                                    )}
                                </div>
                            </div>
                            <div className={cx('exc')}>
                                <div className={cx('list-file')}>
                                   {
                                    student.files.length > 0 ? (
                                        student.files.map((file) => (
                                            <div className={cx('file-item')}>
                                        <div className={cx('info')}>
                                            <h1>{file.name}</h1>
                                            <a href={`http://localhost:3000/files/${file.name}`}>{`http://localhost:3000/files/${file.name}`}</a>
                                        </div>
                                        <Button
                                            onClick={() => downloadFile(file.name)}
                                            className={cx('btn')}
                                            type="primary"
                                            shape="round"
                                            icon={<DownloadOutlined />}
                                            size="medium"
                                        ></Button>
                                    </div>
                                        ))
                                    ): (
                                    <h1>Chưa có bài nộp</h1>
                                    )
                                   }
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>Chưa có học sinh</h1>
                )}
            </div>
        </div>
    );
}

export default SubmitExc;
