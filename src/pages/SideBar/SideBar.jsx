import React from 'react';
import styles from './SideBar.module.css'; // Đảm bảo bạn có CSS phù hợp ở đây

const SideBar = () => {
  return (
    <div className={styles.sidebar_wrapper}>
      {/* CATEGORIES */}
      <div className={styles.aside}>
        <h3 className={styles.aside_title}>Categories</h3>
        <div className={styles.checkbox_filter}>
          {[
            { id: 1, label: 'Laptops', count: 120 },
            { id: 2, label: 'Smartphones', count: 740 },
            { id: 3, label: 'Cameras', count: 1450 },
            { id: 4, label: 'Accessories', count: 578 },
            { id: 5, label: 'Laptops', count: 120 },
            { id: 6, label: 'Smartphones', count: 740 },
          ].map(item => (
            <div className={styles.input_checkbox} key={item.id}>
              <input type="checkbox" id={`category-${item.id}`} />
              <label htmlFor={`category-${item.id}`}>
                <span></span>
                {item.label}
                <small>({item.count})</small>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.aside}>
        <h3 className={styles.aside_title}>Price</h3>
        <div className={styles.price_filter}>
          <div className={styles.radio_div}>
            <label className={styles.radio}>
              <input
                type="radio"
                name="price"
                value="0-1000000"
              />
              Dưới 1 triệu
            </label>
          </div>
          <div className={styles.radio_div}>
            <label className={styles.radio}>
              <input
                type="radio"
                name="price"
                value="1000000-3000000"
              />
              1 - 3 triệu
            </label>
          </div>
          <div className={styles.radio_div}>
            <label className={styles.radio}>
              <input
                type="radio"
                name="price"
                value="3000000-7000000"
              />
              3 - 7 triệu
            </label>
          </div>
          <div className={styles.radio_div}>
            <label className={styles.radio}>
              <input
                type="radio"
                name="price"
                value="7000000-15000000"
              />
              7 - 15 triệu
            </label>
          </div>
          <div className={styles.radio_div} >
            <label className={styles.radio}>
              <input
                type="radio"
                name="price"
                value="15000000-999999999"
              />
              Trên 15 triệu
            </label>
          </div>
        </div>
      </div>

      {/* BRANDS */}
      <div className={styles.aside}>
        <h3 className={styles.aside_title}>Brand</h3>
        <div className={styles.checkbox_filter}>
          {[
            { id: 1, label: 'SAMSUNG', count: 578 },
            { id: 2, label: 'LG', count: 125 },
            { id: 3, label: 'SONY', count: 755 },
            { id: 4, label: 'SAMSUNG', count: 578 },
            { id: 5, label: 'LG', count: 125 },
            { id: 6, label: 'SONY', count: 755 },
          ].map(brand => (
            <div className={styles.input_checkbox} key={brand.id}>
              <input type="checkbox" id={`brand-${brand.id}`} />
              <label htmlFor={`brand-${brand.id}`}>
                <span></span>
                {brand.label}
                <small>({brand.count})</small>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
