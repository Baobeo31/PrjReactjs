import React from 'react'
import styles from './Banner.module.css'
import hotdeal from '../../components/assets/hotdeal.png'; // đường dẫn tới ảnh
const Banner = () => {
  const { containerBanner, title, contentBox } = styles;

  return (
    <div className={containerBanner} style={{ backgroundImage: `url(${hotdeal})` }}>
      <div className={contentBox}>
        <div className={title}>HOT DEAL THIS WEEK</div>
        <h1>NEW COLLECTION UP TO 50% OFF</h1>
        <input type="button" value="SHOP NOW" style={{ width: '150px', height: '50px' }} />
      </div>
    </div>
  )
}

export default Banner
