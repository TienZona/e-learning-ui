import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import google from '~/assets/icon/google.png';
const cx = classNames.bind(styles);

function Auth() {
    return (
        <div className={cx('box')}>
            <h1>Đăng nhập</h1>
            <div className={cx('list')}>
                <div className={cx('item')}>
                    <img src={google} alt="Google" />
                    <span> Tiếp tục với Google</span>
                </div>  

            </div>
            <div className={cx('regis')}>
                <span>Bạn chưa có tài khoảng?</span>
                <strong>Đăng ký</strong>
            </div>
            <p className={cx('term')}>Việc bạn sử dụng trang web này đồng nghĩa bạn đồng ý <u>Điều khoảng sử dụng</u> của chúng tôi</p>
            <div className={cx('footer')}></div>
        </div>
    );
}

export default Auth;
