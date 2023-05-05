import styles from './SliderHome.module.scss';
import classNames from 'classnames/bind';

import React, { Component } from 'react';
import Slider from 'react-slick';
import bg1 from '~/assets/background/bg-1.jpg';
import bg2 from '~/assets/background/bg-2.jpg';
import bg3 from '~/assets/background/bg-3.jpg';
import bg4 from '~/assets/background/bg-4.jpg';
import bg5 from '~/assets/background/bg-5.jpg';

const cx = classNames.bind(styles);

export default class SliderHome extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            adaptiveHeight: true,
            slidesToScroll: 1,
        };

        return (
            <div
                className={cx('bg')}
                style={{ backgroundImage: `url(${bg2})`, height: `${window.innerHeight}px`, width: 'auto' }}
            ></div>
        );
    }
}
