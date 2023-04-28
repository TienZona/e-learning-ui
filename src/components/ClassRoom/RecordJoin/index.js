import styles from './RecordJoin.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import AvatarCircle from '~/components/Global/AvatarCircle';
import { formatTime, getTime } from '~/locallibraries/timestamp';

const cx = classNames.bind(styles);

function RecordJoin({ course, meet }) {
    const [memberGroup, setMemGroup] = useState([]);

    useEffect(() => {
        if (course) {
            const members = course.member.map((mem) => {
                var newMem = mem;
                meet.members.forEach((item) => {
                    if (item.email === mem.email) {
                        newMem = item;
                    }
                });
                return newMem;
            });
            setMemGroup(members);
        }
    }, [meet, course]);


    return (
        <div>
            <h2 className={cx('title-2')}>Thành viên lớp học</h2>
            <div className={cx('list')}>
                {memberGroup.length ? (
                    memberGroup.map((member) => (
                        <div className={cx('item')}>
                            <div className="grid grid-cols-3">
                                <div className="col-span-1">
                                    <div className="flex items-center">
                                        <AvatarCircle avatar={member.avatar} size="40px" border="aqua" />
                                        <h2 className="mx-3">{member.name}</h2>
                                    </div>
                                    <p>{member.email}</p>
                                </div>
                                <div className="col-span-2">
                                    <span className="flex justify-center">Lịch sử tham gia</span>
                                    <div className={cx('list-join')}>
                                        {member.joinTime ? (
                                            <div className={cx('item-join')}>
                                                <h3>
                                                    Vào
                                                    <span className="mx-3 text-cyan-400">
                                                        {formatTime(member.joinTime)}
                                                    </span>
                                                    thoát
                                                    <span className="mx-3 text-red-500">
                                                        {member.outTime ? formatTime(member.outTime) : (<span className='text-emerald-500'>chưa</span>)}
                                                    </span>
                                                   
                                                </h3>
                                            </div>
                                        ) : (
                                            <h1 className="mx-4">Không tham gia {member.joinTime}</h1>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>Chưa có thành viên nào</h1>
                )}
            </div>
        </div>
    );
}

export default RecordJoin;
