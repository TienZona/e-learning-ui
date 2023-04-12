import styles from './ModalCalender.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const cx = classNames.bind(styles);

function ModalCalender({setCalender}) {
    const [title, setTitle] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    useEffect(() => {
        const ID_CLASS = window.location.href.split('/').reverse()[0]
        const calender = {
            id_class: ID_CLASS,
            title: title,
            start_date: startDate,
            end_date: endDate,
        }
        setCalender(calender)
    }, [endDate, setCalender, startDate, title])

    return (
        <div className={cx('wrap')}>
            <div className="my-6">
                <TextField
                    InputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    className={cx('input-text')}
                    id="filled-basic"
                    label="Tiêu đề  "
                    variant="filled"
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
            </div>
            <h1 className='fs-8'>Thời gian</h1>
            <div className='flex items-center'>
                <div className={cx('date-time')}>
                    <DatePicker
                        className={cx('datepicker')}
                        showTimeSelect
                        dateFormat="Pp"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                </div>
                <span>Đến</span>
                <div className={cx('date-time')}>
                    <DatePicker
                        className={cx('datepicker')}
                        showTimeSelect
                        dateFormat="Pp"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                    />
                </div>
            </div>
        </div>
    );
}

export default ModalCalender;
