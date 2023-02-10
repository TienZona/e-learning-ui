import classNames from 'classnames/bind';
import styles from './RandomModal.module.scss';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const cx = classNames.bind(styles);

function RandomModal({ onCloseModal, openRandom }) {
    const handleSubmit = () => {
        onCloseModal();
    };
    return (
        <Modal
            open={openRandom}
            onClose={onCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={cx('modal')}
        >
            <Box className={cx('modal-box')}>
                <div className={cx('modal-header')}>
                    <h3>TẠO MỘT CUỘC THĂM DÒ</h3>
                </div>
                <div className={cx('modal-content')}>
                    
                </div>
                <div className={cx('modal-footer')}>
                    <Button variant="contained" onClick={handleSubmit}>
                        TẠO CÂU HỎI
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default RandomModal;
