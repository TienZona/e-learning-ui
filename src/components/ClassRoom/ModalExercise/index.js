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

// ant design ui
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
const cx = classNames.bind(styles);

function ModalExercise() {
    const theme = useTheme();
    const [isTimeOut, setIsTimeOut] = useState(true);
    const [isEdit, setIsEdit] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [personName, setPersonName] = useState([]);

    const onChangeSwitch = (checked) => {
        setIsTimeOut(checked);
    };

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
                            />
                            <TextField
                                id="filled-multiline-static"
                                placeholder="Hướng dẫn (không bắt buộc)"
                                InputProps={{ style: { fontSize: 16 } }}
                                className={cx('input-text')}
                                multiline
                                rows={4}
                                variant="filled"
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
                                <h2 className='mt-2'>PDF</h2>
                            </div>
                            <div className={cx('icon-item')}>
                                <img src={wordIcon} alt="pdf" />
                                <h2 className='mt-2'>Word</h2>
                            </div>
                            <div className={cx('icon-item')}>
                                <img src={linkIcon} alt="pdf" />
                                <h2 className='mt-2'>Link</h2>
                            </div>
                            <div className={cx('icon-item')}>
                                <img src={youtubeIcon} alt="pdf" />
                                <h2 className='mt-2'>Youtube</h2>
                            </div>
                            <div className={cx('icon-item')}>
                                <img src={googleDriveIcon} alt="pdf" />
                                <h2 className='mt-2'>Drive</h2>
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
                                        {names.map((name) => (
                                            <MenuItem
                                                sx={{ fontSize: 16 }}
                                                key={name}
                                                value={name}
                                                style={getStyles(name, personName, theme)}
                                            >
                                                {name}
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
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1 mt-2 text-right">
                                        <h2>Cho chỉnh sửa</h2>
                                        <div className="mt-4 bs">
                                            <Switch
                                                style={{ margin: '4px 0 0 40px' }}
                                                className="float-left"
                                                size="small"
                                                checked={isEdit}
                                                onChange={onChangeEdit}
                                            />
                                            {isEdit ? (
                                                <span className="underline">Có</span>
                                            ) : (
                                                <span className="underline">Không</span>
                                            )}
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
