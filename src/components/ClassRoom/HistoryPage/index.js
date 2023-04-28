import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import AssignmentIcon from '~/assets/icon/assignment.png';
import Icon from '~/components/Global/Icon';

import styles from './HistoryPage.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import History from '~/components/ClassRoom/History';
import HistoryItem from '../HistoryItem';

const cx = classNames.bind(styles);

function HistoryPage() {
    const [isPage, setIsPage] = useState(true);
    const [date, setDate] = useState(new Date());
    const [meet, setMeet] = useState(null);

    useEffect(() => {
        console.log(date.getMonth());
    }, [date]);

    const handleMonth = (next) => {
        if (next) {
            setDate(new Date(date.setMonth(date.getMonth() + 1)));
        } else {
            setDate(new Date(date.setMonth(date.getMonth() - 1)));
        }
    };

    return (
        <div className={cx('wrap')}>
            {isPage ? (
                <History setPage={setIsPage} setMeet={setMeet} />
            ) : (
                <HistoryItem setPage={setIsPage} meet={meet} />
            )}
        </div>
    );
}

export default HistoryPage;
