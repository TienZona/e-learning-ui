import styles from './MenuTool.module.scss';
import classNames from 'classnames/bind';

// metarial ui
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const cx = classNames.bind(styles);

function MenuTool({onClickNoti, onClickExcer}) {
    const [isIconA, setIconA] = useState(false);

    const handleClick = (e) => {
        if(e === 'noti'){
            onClickNoti(true)
        }
        if(e === 'excer'){
            onClickExcer(true);
        }

        setIconA(false)
    }

    return (
        <div className={cx('wrap')}>
            <div className={cx('btn', isIconA && 'btn-close')} onClick={() => setIconA(!isIconA)}>
                <AddIcon className={cx('icon', isIconA ? 'icon-in' : 'icon-out')} />
            </div>
            <div className={cx('list')}>
                <button className={cx('item', isIconA ? 'fade-in' : 'fade-out')} onClick={() => handleClick('noti')}>Thông báo</button>
                <button className={cx('item', isIconA ? 'fade-in' : 'fade-out')} >Lịch học</button>
                <button className={cx('item', isIconA ? 'fade-in' : 'fade-out')} onClick={() => handleClick('excer')}>Bài tập</button>
            </div>
        </div>
    );
}

export default MenuTool;
