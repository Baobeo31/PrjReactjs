import React from 'react'
import styles from './ProductDetail.module.css'
const ProductDetail = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-md-push-2">
            <div id={styles.product_main_img}>
              <div className={styles.product_preview}>
                <img src="./img/product01.png" alt="" />
              </div>

              <div className={styles.product_preview}>
                <img src="./img/product03.png" alt="" />
              </div>

              <div className={styles.product_preview}>
                <img src="./img/product06.png" alt="" />
              </div>

              <div className={styles.product_preview}>
                <img src="./img/product08.png" alt="" />
              </div>
            </div>
          </div>

          <div className="col-md-2  col-md-pull-5">
            <div id="product-imgs">
              <div className={styles.product_preview}>
                <img src="./img/product01.png" alt="" />
              </div>

              <div className={styles.product_preview}>
                <img src="./img/product03.png" alt="" />
              </div>

              <div className={styles.product_preview}>
                <img src="./img/product06.png" alt="" />
              </div>

              <div className={styles.product_preview}>
                <img src="./img/product08.png" alt="" />
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className={styles.product_detail}>
              <h2 className="product-name">product name goes here</h2>
              <div>
                <div className={styles.product_rating}>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                </div>
                <a className={styles.preview_link} href="#">10 Review(s) | Add your review</a>
              </div>
              <div>
                <h3 className={styles.product_price}>$980.00 <del className={styles.product_old_price}>$990.00</del></h3>
                <span className={styles.product_available}>In Stock</span>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.</p>

              <div className={styles.product_option}>
                <label>
                  Size
                  <select className={styles.input_select}>
                    <option value="0">X</option>
                  </select>
                </label>
                <label>
                  Color
                  <select className={styles.input_select}>
                    <option value="0">Red</option>
                  </select>
                </label>
              </div>

              <div className={styles.add_to_cart}>
                <div className={styles.qty_label}>
                  Qty
                  <div className={styles.input_number}>
                    <input type="number" />
                    <span className={styles.qty_up}>+</span>
                    <span className={styles.qty_down}>-</span>
                  </div>
                </div>
                <button className={styles.add_to_cart_btn}><i className="fa fa-shopping-cart"></i> add to cart</button>
              </div>

              <ul className="product-btns">
                <li><a href="#"><i className="fa fa-heart-o"></i> add to wishlist</a></li>
                <li><a href="#"><i className="fa fa-exchange"></i> add to compare</a></li>
              </ul>

              <ul className={styles.product_link}>
                <li>Category:</li>
                <li><a href="#">Headphones</a></li>
                <li><a href="#">Accessories</a></li>
              </ul>

              <ul className={styles.product_link}>
                <li>Share:</li>
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                <li><a href="#"><i className="fa fa-envelope"></i></a></li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProductDetail
