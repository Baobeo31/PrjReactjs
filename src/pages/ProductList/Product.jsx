import React from 'react';
import styles from './ProductList.module.css';
import { useNavigate } from 'react-router-dom';

const Product = ({ products = [], isLoading, limit, currentPage, totalPage, setPage, setLimit, sortBy, setSortBy }) => {



  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPage) {
      setPage(newPage);
    }
  };
  const navigate = useNavigate()
  const handleNavigatetoDetail = (id) => {
    navigate(`/product-detail/${id}`)
  }
  return (
    <div>
      <div className={styles.store_filter}>
        <div className={styles.store_sort}>
          <label className={styles.store_sort_label}>
            Sort By:
            <select className={styles.input_select} value={sortBy}
              onChange={(e) => {
                setPage(0); // reset về page 0 khi đổi sort
                setSortBy(e.target.value);
              }}>
              <option value="name:asc">Name A-Z</option>
              <option value="name:desc">Name Z-A</option>
              <option value="price:asc">Price Low to High</option>
              <option value="price:desc">Price High to Low</option>
            </select>
          </label>

          <label className={styles.store_sort_label}>
            Show:
            <select className={styles.input_select} onChange={(e) => setLimit(Number(e.target.value))} value={limit}>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </label>
        </div>

        <ul className={styles.store_grid}>
          <li className="active"><i className="fa fa-th"></i></li>
          <li><a href="#"><i className="fa fa-th-list"></i></a></li>
        </ul>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {products.map(product => (
            <div className="col-md-4 col-xs-6" key={product._id}>
              <div className={styles.product}>
                <div className={styles.product_img}>
                  <img src={product.image} alt={product.name} />
                  <div className={styles.overlay} onClick={() => handleNavigatetoDetail(product._id)}>
                    <span>Xem chi tiết</span>
                  </div>
                  <div className={styles.product_label}>
                    {product.discountPrice && (
                      <span className={styles.product_label_sale}>
                        -{Math.round(100 - (product.discountPrice / product.price) * 100)}%
                      </span>
                    )}
                    <span className={styles.product_label_new}>NEW</span>
                  </div>
                </div>

                <div className={styles.product_body}>
                  <p className={styles.product_category}>{product.category}</p>
                  <h3 className={styles.product_name}>
                    <a href="#">{product.name}</a>
                  </h3>
                  <h4 className={styles.product_price}>
                    {product.discountPrice?.toLocaleString()}₫
                    {product.discountPrice && (
                      <del className={styles.product_old_price}>
                        {product.price.toLocaleString()}
                      </del>
                    )}
                  </h4>
                  <div className={styles.product_rating}>
                    {[...Array(Math.round(product.rating))].map((_, i) => (
                      <i key={i} className="fa fa-star" style={{ color: 'gold' }}></i>
                    ))}
                    {[...Array(5 - Math.round(product.rating))].map((_, i) => (
                      <i key={i} className="fa fa-star-o" style={{ color: 'gold' }}></i>
                    ))}
                  </div>
                </div>

                <div className={styles.add_to_cart}>
                  <button className={styles.add_to_cart_btn}>
                    <i className="fa fa-shopping-cart"></i> Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className={styles.pagination}>
        <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
          Prev
        </button>
        <span>Trang {currentPage + 1} / {totalPage}</span>
        <button disabled={currentPage + 1 >= totalPage} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
