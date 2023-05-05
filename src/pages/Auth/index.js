import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import googleIcon from '~/assets/icon/google.png';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { addAuth } from '~/redux/actions/auth';
import { getAvatar, getEmail, getUserName } from '~/locallibraries/getCokie';
import AvatarCircle from '~/components/Global/AvatarCircle'
import { useNavigate } from "react-router-dom";

googleLogout();

const cx = classNames.bind(styles);

function Auth() {
    document.title = 'Đăng nhập';
    const dispatch = useDispatch();

    const createAuthCookie = (data) => {
        setCookie('username', data.name, 30);
        setCookie('email', data.email, 30);
        setCookie('avatar', data.picture, 30);
        setCookie('userID', data.userID, 30);
    };

    const setCookie = (cname, cvalue, exdays) => {
        var d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + '; ' + expires;
    };

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                    'Content-Type': 'application/json',
                },
            });

            const userID = Date.now();
            response.data.userID = userID;
            const auth = {
                userID: userID,
                name: response.data.name,
                email: response.data.email,
                avatar: response.data.picture,
                peerID: '',
                stream: [],
                audio: null,
            };

            dispatch(addAuth(auth));
            createAuthCookie(response.data);

            window.location.href = '/';
        },
        select_account: true,

        onError: (err) => {
            console.log('Login Failed ' + err);
        },
    });

    const checkLogin = () => {
        return getEmail() !== '';
    };

    const navigate = useNavigate();

    const logout = () => {
        document.cookie = 'email=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'username=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'avatar=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'userID=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        navigate(0);
    };

    return (
        <div className={cx('box')}>
            <h1>Đăng nhập</h1>
            <div className={cx('list')}>
                {checkLogin() ? (
                    <div className="flex flex-col items-center">
                        <AvatarCircle avatar={getAvatar()} size="50px" />
                        <h2 className="text-black mb-2">{getUserName()}</h2>
                        <h2 className="text-black mb-10">{getEmail()}</h2>
                        <button className={cx('item')} onClick={() => logout()}>
                            Đăng xuất
                        </button>
                    </div>
                ) : (
                    <div id="signInBtn" className={cx('item')} onClick={() => login()}>
                        <img src={googleIcon} alt="Google" />
                        <span> Tiếp tục với Google</span>
                    </div>
                )}
            </div>
            <div className={cx('regis')}>
                <span>Bạn chưa có tài khoảng?</span>
                <strong>Đăng ký</strong>
            </div>
            <p className={cx('term')}>
                Việc bạn sử dụng trang web này đồng nghĩa bạn đồng ý <u>Điều khoảng sử dụng</u> của chúng tôi
            </p>
            <div className={cx('footer')}></div>
        </div>
    );
}

export default Auth;
