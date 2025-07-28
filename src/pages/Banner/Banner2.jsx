import React from 'react'
import styles from './css/Banner2.module.css'
import shop01 from '../../components/assets/product01.png'
import shop03 from '../../components/assets/product03.png'
import shop02 from '../../components/assets/product02.png'
const Banner2 = () => {
  return (
    <div>

      <div class={styles.section}>
        <div class={styles.container}>
          <div class="row">
            <div class="col-md-4 col-xs-6">
              <div class={styles.shop}>
                <div class={styles.shop_img}>
                  <img src={shop01} alt="" />
                  <div className={styles.overlay}></div> {/* CHÉO ĐỎ */}
                </div>

                <div class={styles.shop_body}>
                  <h3>Laptop<br />Collection</h3>
                  <a href="#" class={styles.cta_btn}>Shop now <i class="fa fa-arrow-circle-right"></i></a>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-6">
              <div class={styles.shop}>
                <div class={styles.shop_img}>
                  <img src={shop02} alt="" />
                  <div className={styles.overlay}></div> {/* CHÉO ĐỎ */}
                </div>
                <div class={styles.shop_body}>
                  <h3>Accessories<br />Collection</h3>
                  <a href="#" class={styles.cta_btn}>Shop now <i class="fa fa-arrow-circle-right"></i></a>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-xs-6">
              <div class={styles.shop}>
                <div class={styles.shop_img}>
                  <img src={shop03} alt="" />
                  <div className={styles.overlay}></div> {/* CHÉO ĐỎ */}
                </div>
                <div class={styles.shop_body}>
                  <h3>Cameras <br />Collection</h3>
                  <a href="#" class={styles.cta_btn}>Shop now <i class="fa fa-arrow-circle-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner2
