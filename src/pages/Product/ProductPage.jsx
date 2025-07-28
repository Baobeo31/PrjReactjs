import React from 'react'
import SideBar from '../SideBar/SideBar'
import Product from '../ProductList/Product'
import styles from './Product.module.css';
const ProductPage = () => {
  return (
    <div className={styles.product_page} >
      <div className="col-md-3">
        <SideBar />
      </div>
      <div className="col-md-9">
        <Product />
      </div>

    </div>


  )
}

export default ProductPage
