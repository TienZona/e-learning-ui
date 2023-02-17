import classNames from 'classnames/bind';
import styles from './ToolHost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import iconSurvey from '~/assets/icon/survey-results.png';
import iconRandom from '~/assets/icon/random.png';
import iconExem from '~/assets/icon/exam.png';
import iconBoard from '~/assets/icon/board.png';
import { useState } from 'react';
import SurveyModal from '../SurveyModal';
import ExamModal from '../ExamModal';
import RandomModal from '../RandomModal';

const cx = classNames.bind(styles);

function ToolHost() {
    const [openSurvey, setOpenSurvey] = useState(false);
    const [openExam, setOpenExam] = useState(false);
    const [openRandom, setOpenRandom] = useState(false);


    // survey handle
    const handleOpenSurvey = () => setOpenSurvey(true);
    const handleCloseSurveyModal = () => setOpenSurvey(false);

    // exam handle
    const handleOpenExam = () => setOpenExam(true);
    const handleCloseExamModal = () => setOpenExam(false);

    // random handle
    const handleOpenRandom = () => setOpenRandom(true);
    const handleCloseRandomModal = () => setOpenRandom(false);

    return (
        <div>
            <div className={cx('box')}>
                <div className={cx('item', 'focus')}>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon className={cx('font-icon')} icon={faGear} />
                    </div>
                    <span>Tool</span>
                </div>
                <div className={cx('navbar')}>
                    <div className={cx('item')} onClick={handleOpenSurvey}>
                        <img src={iconSurvey} alt="user" />
                        <span>Survey</span>
                    </div>
                    <div className={cx('item')} onClick={handleOpenRandom}>
                        <img src={iconRandom} alt="user" />
                        <span>Random</span>
                    </div>
                    <div className={cx('item')}  onClick={handleOpenExam}>
                        <img src={iconExem} alt="" />
                        <span>Exam</span>
                    </div>
                    <div className={cx('item')}  onClick={handleOpenExam}>
                        <img src={iconBoard} alt="" />
                        <span>Board</span>
                    </div>
                </div>
            </div>
            <SurveyModal onCloseModal={handleCloseSurveyModal} openSurvey={openSurvey}/>
            <ExamModal onCloseModal={handleCloseExamModal} openExam={openExam}/>
            <RandomModal onCloseModal={handleCloseRandomModal} openRandom={openRandom}/>

        </div>
    );
}

export default ToolHost;
