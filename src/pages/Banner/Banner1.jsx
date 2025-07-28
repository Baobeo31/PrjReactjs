import React from 'react'
import styles from './css/Banner1.module.css'
import hotdeal from '../../components/assets/img3.png'; // đường dẫn tới ảnh
import hotdeal2 from '../../components/assets/img1.png'
import hotdeal3 from '../../components/assets/img2.png'
import SliderComponent from '../../components/SliderComponent/Slider';

const Banner1 = () => {
  const { containerBanner, title, contentBox } = styles;

  return (
    <div className={containerBanner}>
      <SliderComponent arrImages={[hotdeal2, hotdeal3]}>
      </SliderComponent>
    </div>
  )
}

export default Banner1
