import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import UserItem from "../UserItem";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }

export default class SliderUser extends Component {
  render() {
    const users = this.props.users;
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 4,
      speed: 500,
      focusOnSelect: true,
      nextArrow: <></>,
      prevArrow: <></>
    };
    return (
      <div>
        <Slider {...settings}>
          {users.map((user, index) => (<UserItem key={index} item={user} />))}
        </Slider>
      </div>
    );
  }
}