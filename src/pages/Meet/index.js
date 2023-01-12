import classNames from 'classnames/bind';
import styles from './Meet.module.scss';
const cx = classNames.bind(styles);

function Meet() {
    return (
        <div className={cx('')}>
            <header className={cx('header')}>
                <div className="container">
                    <h1>Tạo một cuộc họp ngay và luôn</h1>
                    <div>
                        <h3>MEETING</h3>
                        <img src="https://cdn-icons-png.flaticon.com/512/7185/7185630.png" alt="" />
                    </div>
                </div>
            </header>
            <div className={cx('container') + ' container'}>
                <div className={cx('slide')}>
                    <img src="https://www.tameday.com/wp-content/uploads/2018/10/effective-meetings.jpg" alt="" />
                    {/* <div className={cx('slide-2')}>
                        <h3>TÊN BẠN LÀ</h3>
                        <div className={cx('input-name')}>
                            <input type="text" placeholder='Nhập tên gọi của bạn'/>
                        </div>
                    </div> */}
                    <button class="btn">
                        <span>Tiếp tục</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Meet;
