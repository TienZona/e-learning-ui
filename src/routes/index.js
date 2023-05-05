import MeetingLayout from '~/components/Layout/MeetingLayout';
import AuthLayout from '~/components/Layout/AuthLayout';
import ClassRoomLayout from '~/components/Layout/ClassRoomLayout';
import ClassLayout from '~/components/Layout/ClassLayout';

import Home from '~/pages/Home';
import Meeting from '~/pages/Meeting';
import Meet from '~/pages/Meet';
import Auth from '~/pages/Auth';
import Test from '~/pages/Test';
import ClassRoom from '~/pages/ClassRoom';
import Class from '~/pages/Class';
import CreateClass from '~/components/ClassRoom/CreateClass';
import EndMeeting from '~/pages/EndMeeting';
import PageNotFound from '~/pages/NotFound';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: null,
    },
    {
        path: '/home',
        component: Home,
        layout: null,
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
        path: '/account',
        component: Auth,
        layout: AuthLayout,
    },
    {
        path: '/classroom',
        component: Class,
        layout: ClassLayout,
    },
    {
        path: '/classroom/:id',
        component: ClassRoom,
        layout: ClassRoomLayout,
    },
    {
        path: '/classroom/edit/:id',
        component: CreateClass,
        layout: ClassLayout
    },
    {
        path: '/meeting/end',
        component: EndMeeting
    },
    {
        path: '*',
        component: PageNotFound,
    }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
