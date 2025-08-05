import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar';
import Product from '../ProductList/Product';
import styles from './Product.module.css';
import { getAllProduct } from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';

const ProductPage = () => {
  const [sortBy, setSortBy] = useState('name:asc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(2);
  const [filter, setFilter] = useState({
    categories: [],
    brands: [],
    priceRange: ''
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', { page, limit, sort: sortBy, filter }],  
    queryFn: () => getAllProduct({ page, limit, sort: sortBy, filter }),
    keepPreviousData: true
  });

  useEffect(() => {
    if (data) {
      console.log('OK');

    }
  }, [data])
  console.log(filter);

  return (
    <div className={styles.product_page}>
      <div className="col-md-3">
        <SideBar filter={filter} setFilter={setFilter} />
      </div>
      <div className="col-md-9">
        <Product
          limit={limit}
          isLoading={isLoading}
          products={data?.data || []}
          currentPage={data?.currentPage || 0}
          totalPage={data?.totalPages || 1}
          setPage={setPage}
          setLimit={setLimit}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
    </div>
  );
};

export default ProductPage;
