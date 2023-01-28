import MeetingLayout from '~/components/Layout/MeetingLayout';
import AuthLayout from '~/components/Layout/AuthLayout';

import Home from '~/pages/Home';
import Meeting from '~/pages/Meeting';
import Meet from '~/pages/Meet';
import Auth from '~/pages/Auth';
import Test from '~/pages/Test';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/meeting/:id',
        component: Meeting,
        layout: MeetingLayout,
    },
    {
        path: '/meet',
        component: Meet,
        layout: MeetingLayout,
    },
    {
        path: '/auth',
        component: Auth,
        layout: AuthLayout,
    },
    {
        path: '/meeting',
        component: Test,
        layout: MeetingLayout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
