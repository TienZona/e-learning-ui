import styles from './ModalExercise.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

// react datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// ant design ui
import { Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

// material ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

// icon local
import pdfIcon from '~/assets/icon/pdf.png';
import linkIcon from '~/assets/icon/link.png';
import googleDriveIcon from '~/assets/icon/google-drive.png';
import youtubeIcon from '~/assets/icon/youtube.png';
import wordIcon from '~/assets/icon/word.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AvatarCircle from '~/components/Global/AvatarCircle';
import Exercise from '../Exercise';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}

const cx = classNames.bind(styles);

function ModalExercise({ setExercise }) {
    const theme = useTheme();
    const auth = useSelector((state) => state.auth);
    const [isTimeOut, setIsTimeOut] = useState(true);
    const [isEdit, setIsEdit] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [personName, setPersonName] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectStudents, setSelectStudents] = useState([]);

    // set input data
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [score, setScore] = useState(100);
    const [files, setFile] = useState([]);

    // ant design ui
    const props = {
        name: 'file',
        action: 'http://localhost:3000/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setFile(info.fileList);
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        beforeUpload: async (file) => {
            console.log(file);
        },
    };

    useEffect(() => {
        const ID_CLASS = window.location.href.split('/').reverse()[0];
        const exc = {
            id_class: ID_CLASS,
            author: {
                name: auth.name,
                email: auth.email,
                avatar: auth.avatar,
            },
            title: title,
            content: content,
            students: personName.includes('all') ? students : selectStudents,
            deadline: startDate,
            late: isTimeOut,
            score: score,
            edit: isEdit,
            files: files,
        };
        setExercise(exc);
    }, [
        auth.avatar,
        auth.email,
        auth.name,
        content,
        files,
        isEdit,
        isTimeOut,
        personName,
        score,
        selectStudents,
        setExercise,
        startDate,
        students,
        title,
    ]);


    useEffect(() => {
        const newList = students.filter((student) => {
            if (personName.includes(student.email)) {
                return student;
            }
        });
        setSelectStudents(newList);
    }, [personName, students]);

    function onChangeSwitch(checked) {
        setIsTimeOut(checked);
    }

    const onChangeEdit = (checked) => {
        setIsEdit(checked);
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        const ID_CLASS = window.location.href.split('/').reverse()[0];
        axios
            .get(`http://localhost:3000/api/class/member/${ID_CLASS}`)
            .then((res) => setStudents(res.data.member))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={cx('wrap')}>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3">
                    <div className={cx('content-left')}>
                        <Box
                            className="py-4"
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                InputProps={{ style: { fontSize: 16 } }}
                                InputLabelProps={{ style: { fontSize: 16 } }}
                                className={cx('input-text')}
                                id="filled-basic"
                                label="Câu hỏi  "
                                variant="filled"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                id="filled-multiline-static"
                                placeholder="Hướng dẫn (không bắt buộc)"
                                InputProps={{ style: { fontSize: 16 } }}
                                className={cx('input-text')}
                                multiline
                                rows={4}
                                variant="filled"
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Box>
                        <div className={cx('upload')}>
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Đính kèm tệp</Button>
                            </Upload>
                        </div>
                        <div className={cx('list-icon')}>
                            <div className={cx('icon-item')}>
                                <img src={pdfIcon} alt="pdf" />
                                <h2 className="mt-2">PDF</h2>
                            </div>
                            <div className={cx('icon-item')}>
                                <img src={wordIcon} alt="pdf" />
                                <h2 className="mt-2">Word</h2>
                            </div>
                            <div className={cx('icon-item')}>
                                <img src={linkIcon} alt="pdf" />
                                <h2 className="mt-2">Link</h2>
                            </div>
                            <div className={cx('icon-item')}>
                                <img src={youtubeIcon} alt="pdf" />
                                <h2 className="mt-2">Youtube</h2>
                            </div>
                            <div className={cx('icon-item')}>
                                <img src={googleDriveIcon} alt="pdf" />
                                <h2 className="mt-2">Drive</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className={cx('content-right')}>
                        <div>
                            <h2>Dành cho</h2>
                            <div>
                                <FormControl sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-multiple-chip-label" sx={{ fontSize: 16 }}>
                                        Tất cả
                                    </InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Dành cho" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} sx={{ fontSize: 14 }} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem
                                            sx={{ fontSize: 16 }}
                                            key={1}
                                            value="all"
                                            style={getStyles('all', personName, theme)}
                                        >
                                            Tất cả
                                        </MenuItem>
                                        {students.map((student) => (
                                            <MenuItem
                                                sx={{ fontSize: 16 }}
                                                key={student.email}
                                                value={student.email}
                                                style={getStyles(student.email, personName, theme)}
                                            >
                                                <AvatarCircle size="20px" avatar={student.avatar} /> {student.email}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className="grid grid-cols-3 mt-4">
                                    <div className="col-span-2 mt-2">
                                        <h2>Hạn nộp</h2>
                                        <div className={cx('date-time')}>
                                            <DatePicker
                                                className={cx('datepicker')}
                                                showTimeSelect
                                                dateFormat="Pp"
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1 mt-2 text-right">
                                        <h2>Cho quá hạn</h2>
                                        <div className="mt-4 bs">
                                            <Switch
                                                style={{ margin: '4px 0 0 40px' }}
                                                className="float-left"
                                                size="small"
                                                checked={isTimeOut}
                                                onChange={onChangeSwitch}
                                            />
                                            {isTimeOut ? (
                                                <span className="underline">Có</span>
                                            ) : (
                                                <span className="underline">Không</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 mt-4">
                                    <div className="col-span-2 mt-2">
                                        <h2>Điểm bài tập</h2>
                                        <div className="p-4" style={{ width: '220px' }}>
                                            <TextField
                                                id="outlined-number"
                                                label="Điểm"
                                                type="number"
                                                size="small"
                                                defaultValue="100"
                                                InputProps={{ style: { fontSize: 16 } }}
                                                InputLabelProps={{ style: { fontSize: 16 } }}
                                                onChange={(e) => setScore(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalExercise;
