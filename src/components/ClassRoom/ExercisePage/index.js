import styles from './ExercisePage.module.scss';
import classNames from 'classnames/bind';
import Exercise from '~/components/ClassRoom/Exercise';

// timeline
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

// icon local
import WordIcon from '~/assets/icon/word.png';
import PDFIcon from '~/assets/icon/pdf.png';
import DriveIcon from '~/assets/icon/google-drive.png';
import Icon from '~/components/Global/Icon';
import AssignmentIcon from '~/assets/icon/assignment.png';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ExercisePage() {
    const colors = ['#467fd0', '#42ba96', '#ffc107', '#df4759'];
    const [isTimeLine, setIsTimeLine] = useState(true);

    return (
        <div className={cx('wrap')}>
            <div className={cx('nav')}></div>
            {!isTimeLine && <Exercise setIsTimeLine={setIsTimeLine}/>}

            {isTimeLine && (
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: colors[0], color: '#fff' }}
                        contentArrowStyle={{ borderRight: `7px solid  ${colors[0]}` }}
                        date="12:00 - 24 thg 3 - Chưa làm"
                        iconStyle={{ background: '#fff', color: '#fff' }}
                        icon={<Icon icon={AssignmentIcon} />}
                    >
                        <div onClick={() => setIsTimeLine(false)}>
                            <h3 className="vertical-timeline-element-title">Tiêu đề bài tập</h3>
                            <p>Nội dung hướng dẫn</p>
                        </div>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: colors[1], color: '#fff' }}
                        contentArrowStyle={{ borderRight: `7px solid  ${colors[1]}` }}
                        date="12:00 - 24 thg 3 - Đã làm"
                        iconStyle={{ background: '#fff', color: '#fff' }}
                        icon={<Icon icon={WordIcon} />}
                    >
                        <h3 className="vertical-timeline-element-title">Tiêu đề bài tập</h3>
                        <p>Nội dung hướng dẫn</p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: colors[2], color: '#fff' }}
                        contentArrowStyle={{ borderRight: `7px solid  ${colors[2]}` }}
                        date="12:00 - 24 thg 3 - Sắp đến hạn"
                        iconStyle={{ background: '#fff', color: '#fff' }}
                        icon={<Icon icon={WordIcon} />}
                    >
                        <h3 className="vertical-timeline-element-title">Tiêu đề bài tập</h3>
                        <p>Nội dung hướng dẫn</p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: colors[3], color: '#fff' }}
                        contentArrowStyle={{ borderRight: `7px solid  ${colors[3]}` }}
                        date="12:00 - 24 thg 3 - Quá hạn"
                        iconStyle={{ background: '#fff', color: '#fff' }}
                        icon={<Icon icon={DriveIcon} />}
                    >
                        <h3 className="vertical-timeline-element-title">Tiêu đề bài tập</h3>
                        <p>Nội dung hướng dẫn</p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            )}
        </div>
    );
}

export default ExercisePage;
