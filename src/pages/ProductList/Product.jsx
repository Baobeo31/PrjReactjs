import React from 'react'
import styles from './ProductList.module.css'
import img1 from '../../components/assets/product01.png'
const Product = () => {
  return (
    <div>
      <div className={styles.store_filter}>
        <div className={styles.store_sort}>
          <label className={styles.store_sort_label}>
            Sort By:
            <select className={styles.input_select}>
              <option value="0">Popular</option>
              <option value="1">Position</option>
            </select>
          </label>

          <label className={styles.store_sort_label}>
            Show:
            <select className={styles.input_select}>
              <option value="0">20</option>
              <option value="1">50</option>
            </select>
          </label>
        </div>
        <ul className={styles.store_grid}>
          <li className="active"><i className="fa fa-th"></i></li>
          <li><a href="#"><i class="fa fa-th-list"></i></a></li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-4 col-xs-6">
          <div className={styles.product}>
            <div className={styles.product_img}>
              <img src={img1} alt="" />
              <div className={styles.product_label}>
                <span className={styles.product_label_sale}>-30%</span>
                <span className={styles.product_label_new}>NEW</span>
              </div>
            </div>
            <div className={styles.product_body}>
              <p className={styles.product_category}>Category</p>
              <h3 className={styles.product_name}><a href="#">product name goes here</a></h3>
              <h4 className={styles.product_price}>$980.00 <del className={styles.product_old_price}>$990.00</del></h4>
              <div className={styles.product_rating}>
                <i className="fa fa-star" style={{ color: 'gold' }}></i>
                <i className="fa fa-star" style={{ color: 'gold' }}></i>
                <i className="fa fa-star" style={{ color: 'gold' }}></i>
                <i className="fa fa-star" style={{ color: 'gold' }}></i>
                <i className="fa fa-star" style={{ color: 'gold' }}></i>
              </div>
            </div>
            <div className={styles.add_to_cart}>
              <button className={styles.add_to_cart_btn}><i className="fa fa-shopping-cart"></i> add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
