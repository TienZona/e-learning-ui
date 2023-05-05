import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import UserItem from "../UserItem";

export default class SliderUser extends Component {
  render() {
    const users = this.props.users;
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      focusOnSelect: true,
      nextArrow: <></>,
      prevArrow: <></>
    };
    return (
      <div>
        <Slider {...settings}>
          {users.map((user, index) => (<UserItem key={index} user={user} />))}
        </Slider>
      </div>
    );
  }
}