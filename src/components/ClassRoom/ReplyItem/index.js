import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import AvatarCircle from '~/components/Global/AvatarCircle';
import styles from './ReplyItem.module.scss';

const cx = classNames.bind(styles);

function ReplyItem() {
    const [color, setColor] = useState(null);
    const generateColor = () => {
        return Math.random().toString(16).substr(-6);
    };

    useEffect(() => {
        setColor(generateColor());
    }, []);

    return (
        <div className={cx('wrap')} style={{ backgroundColor: `#${color}` }}>
            <div className={cx('header')}>
                <AvatarCircle
                    size="30px"
                    border="blue"
                    avatar=""
                />
                <div className={cx('infor')}>
                    <h4>Chung Phat Tien</h4>
                    <p>tienb1910000@student.ctu.edu.vn</p>
                </div>
            </div>
            <div className={cx('content')}>
                <p>Hello xin chaof cvao bvbn toi ten la chung phat ien klaskjd aljasd asd sd</p>
            </div>
            <div className="time">
                <span>1 thg 3, 2023</span>
                <span>12:12</span>
            </div>
        </div>
    );
}

export default ReplyItem;
