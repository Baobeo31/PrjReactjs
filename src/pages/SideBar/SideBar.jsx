import React from 'react';
import styles from './SideBar.module.css';

const categoriesList = [
  { id: 1, label: 'Laptops', count: 120 },
  { id: 2, label: 'Smartphones', count: 740 },
  { id: 3, label: 'Cameras', count: 1450 },
  { id: 4, label: 'Accessories', count: 578 },
];

const brandsList = [
  { id: 1, label: 'Apple', count: 578 },
  { id: 2, label: 'ASUS', count: 125 },
  // { id: 3, label: 'SONY', count: 755 },
];

const priceRanges = [
  { label: 'Dưới 1 triệu', value: { min: 0, max: 1000000 } },
  { label: '1 - 3 triệu', value: { min: 1000000, max: 3000000 } },
  { label: '3 - 7 triệu', value: { min: 3000000, max: 7000000 } },
  { label: '7 - 15 triệu', value: { min: 7000000, max: 15000000 } },
  { label: 'Trên 15 triệu', value: { min: 15000000 } }, // Không có max
];
const SideBar = ({ filter, setFilter }) => {
  const handleCategoryChange = (label) => {
    const newCategories = filter.categories.includes(label)
      ? filter.categories.filter(item => item !== label)
      : [...filter.categories, label];
    setFilter({ ...filter, categories: newCategories });
  };

  const handleBrandChange = (label) => {
    const newBrands = filter.brands.includes(label)
      ? filter.brands.filter(item => item !== label)
      : [...filter.brands, label];
    setFilter({ ...filter, brands: newBrands });
  };

  const handlePriceChange = (value) => {
    setFilter(prev => ({
      ...prev,
      priceRange: value
    }));
  };
  return (
    <div className={styles.sidebar_wrapper}>
      {/* CATEGORIES */}
      <div className={styles.aside}>
        <h3 className={styles.aside_title}>Categories</h3>
        <div className={styles.checkbox_filter}>
          {categoriesList.map(item => (
            <div className={styles.input_checkbox} key={item.id}>
              <input
                type="checkbox"
                id={`category-${item.id}`}
                checked={filter.categories.includes(item.label)}
                onChange={() => handleCategoryChange(item.label)}
              />
              <label htmlFor={`category-${item.id}`}>
                <span></span>
                {item.label}
                <small>({item.count})</small>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div className={styles.aside}>
        <h3 className={styles.aside_title}>Price</h3>
        <div className={styles.price_filter}>
          {priceRanges.map((item, index) => (
            <div className={styles.radio_div} key={index}>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="price"
                  value={item.value}
                  checked={filter.priceRange === item.value}
                  onChange={() => handlePriceChange(item.value)}
                />
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* BRANDS */}
      <div className={styles.aside}>
        <h3 className={styles.aside_title}>Brand</h3>
        <div className={styles.checkbox_filter}>
          {brandsList.map(brand => (
            <div className={styles.input_checkbox} key={brand.id}>
              <input
                type="checkbox"
                id={`brand-${brand.id}`}
                checked={filter.brands.includes(brand.label)}
                onChange={() => handleBrandChange(brand.label)}
              />
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
