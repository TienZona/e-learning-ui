import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import { useDispatch } from 'react-redux';
import { addAuth } from './redux/actions/auth';
import Auth from './pages/Auth';
import AuthLayout from './components/Layout/AuthLayout';

function App() {
    const dispatch = useDispatch();

    const getCookie = (cname) => {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    };
    const user = {
        userID: getCookie('userID'),
        name: getCookie('username'),
        email: getCookie('email'),
        avatar: getCookie('avatar'),
        peerID: '',
        stream: [],
        audio: null,
    };

    dispatch(addAuth(user));

    const checkLogin = () => {
        return getCookie('email') !== '';
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return checkLogin() ? (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        ) : (
                            <Route
                                key={index}
                                path={'*'}
                                element={
                                    <AuthLayout>
                                        <Auth />
                                    </AuthLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
