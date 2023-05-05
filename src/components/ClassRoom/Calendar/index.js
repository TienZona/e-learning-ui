import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';
import Paper from '@mui/material/Paper';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Appointments,
    Toolbar,
    ViewSwitcher,
    AppointmentTooltip,
    AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { DateNavigator } from '@devexpress/dx-react-scheduler-material-ui';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Calendar() {
    const [schedulerData, setListDate] = useState([]);
    useEffect(() => {
        const ID_CLASS = window.location.href.split('/').reverse()[0]
        axios.get(`http://localhost:3000/api/classroom/calender/${ID_CLASS}`)
            .then(res => {
                const results = res.data.map((data) => {
                    return {
                        startDate: data.start_date,
                        endDate: data.end_date,
                        title: data.title
                    }
                })  
                setListDate(results)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div className={cx('wrap')}>
            <Paper>
                <Scheduler data={schedulerData} height={660}>
                    <ViewState defaultCurrentDate={Date.now()} defaultCurrentViewName="Day" />

                    <DayView startDayHour={1} endDayHour={24} cellDuration={60} />
                    <WeekView startDayHour={1} endDayHour={24} cellDuration={60} />
                    <MonthView />
                    <Toolbar />
                    <ViewSwitcher />
                    <DateNavigator />
                    <Appointments />
                    <AppointmentTooltip showCloseButton showOpenButton />
                    <AppointmentForm  onValueChange={(e) => console.log(e)} />
                </Scheduler>
            </Paper>
        </div>
    );
}

export default Calendar;
