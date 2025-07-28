// SliderComponent.jsx
import React from 'react';
import Slider from "react-slick";
import './Slider.module.css'; // nếu bạn muốn CSS riêng

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {arrImages.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`slide-${index}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
        </div>
      ))}
    </Slider>
  );
};

export default SliderComponent;
