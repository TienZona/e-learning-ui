import Home from '~/pages/Home';
import Meeting from '~/pages/Meeting'
import MeetingLayout from '~/components/Layout/MeetingLayout';

const publicRoutes = [
    {
        path: '/',
        component: Home,

        path: '/meeting',
        component: Meeting,
        layout: MeetingLayout
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
