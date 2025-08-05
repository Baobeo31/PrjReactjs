import React, { useState } from 'react'
import styles from './ProductDetail.module.css'
import { useMutationHooks } from '../../hook/useMutation'
import { getProductDetail } from '../../services/ProductService'
import img1 from '../../components/assets/product01.png'
import img2 from '../../components/assets/product03.png'
import img3 from '../../components/assets/product06.png'
import img4 from '../../components/assets/product08.png'
import Slider from 'react-slick'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const ProductDetail = () => {
  const { id } = useParams() // Lấy id từ URL

  const fetchGetDetailProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1]
    if (id) {
      const res = await getProductDetail(id)
      return res.data
    }
  }

  const { isLoading, data: product } = useQuery({
    queryKey: ['product-detail', id],
    queryFn: () => getProductDetail(id),
    enabled: !!id
  })



  const [selectedImage, setSelectedImage] = useState(img1);
  const images = [img1, img2, img3, img4];
  const sliderSettings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: true,
    autoplay: false,
    speed: 300,
  };
  if (isLoading) return <div>Đang tải dữ liệu...</div>
  if (!product) return <div>Không tìm thấy sản phẩm</div>
  return (
    <div className={styles.section}>
      <div className="container">
        <div className="row">
          {/* LEFT SIDE: Thumbnail + Main Image */}
          <div className="col-md-6 d-flex">
            {/* Thumbnails */}
            <div className={styles.product_imgs}>
              <Slider {...sliderSettings}>
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`${styles.product_preview} ${selectedImage === img ? styles.active : ""}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} alt={`Thumbnail ${index}`} />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Main Image */}
            <div className={styles.product_main_image}>
              <img src={selectedImage} alt="Main product" />
            </div>
          </div>

          {/* RIGHT SIDE: Product Details */}
          <div className="col-md-6">
            <div className={styles.product_details}>
              {/* Tên sản phẩm */}
              <h2 className={styles.product_name}>{product?.name}</h2>

              {/* Đánh giá và liên kết review */}
              <div>
                <div className={styles.product_rating}>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                </div>
                <a className={styles.review_link} href="#">
                  {product?.rating || 0} đánh giá | Thêm đánh giá
                </a>
              </div>

              {/* Giá sản phẩm */}
              <div>
                <h3 className={styles.product_price}>
                  {product?.discountPrice?.toLocaleString()}₫{' '}
                  <del className={styles.product_old_price}>
                    {product?.price?.toLocaleString()}₫
                  </del>
                </h3>
                <span className={styles.product_available}>
                  Còn hàng: {product?.countInStock}
                </span>
              </div>

              {/* Mô tả sản phẩm */}
              <p>{product?.description}</p>

              {/* Tuỳ chọn size, màu (tuỳ bạn có cần dữ liệu động không) */}
              <div className={styles.product_options}>
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

              {/* Thêm vào giỏ hàng */}
              <div className={styles.add_to_cart}>
                <div className={styles.qty_label}>
                  Số lượng
                  <div className={styles.input_number}>
                    <input type="number" defaultValue={1} />
                    <span className={styles.qty_up}>+</span>
                    <span className={styles.qty_down}>-</span>
                  </div>
                </div>
                <button className={styles.add_to_cart_btn}>
                  <i className="fa fa-shopping-cart"></i> Thêm vào giỏ
                </button>
              </div>

              {/* Wishlist & Compare */}
              <ul className={styles.product_btns}>
                <li><a href="#"><i className="fa fa-heart-o"></i> Thêm vào yêu thích</a></li>
                <li><a href="#"><i className="fa fa-exchange"></i> So sánh</a></li>
              </ul>

              {/* Danh mục sản phẩm */}
              <ul className={styles.product_links}>
                <li>Danh mục:</li>
                <li><a href="#">{product?.category || 'Chưa phân loại'}</a></li>
              </ul>

              {/* Chia sẻ mạng xã hội */}
              <ul className={styles.product_links}>
                <li>Chia sẻ:</li>
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                <li><a href="#"><i className="fa fa-envelope"></i></a></li>
              </ul>
            </div>
          </div>


          {/* BOTTOM SECTION: Product Tabs */}
          <div className="product_description_wrapper">
            <div className="col-md-12 mt-4">
              <div id="product-tab">
                {/* Tab Navigation */}
                <ul className="nav nav-tabs">
                  <li className="active"><a data-toggle="tab" href="#tab1">Description</a></li>
                  <li><a data-toggle="tab" href="#tab2">Details</a></li>
                  <li><a data-toggle="tab" href="#tab3">Reviews (3)</a></li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                  <div id="tab1" className="tab-pane fade in active">
                    <p>Product description here...</p>
                  </div>
                  <div id="tab2" className="tab-pane fade">
                    <p>Product details here...</p>
                  </div>
                  <div id="tab3" className="tab-pane fade">
                    <p>Customer reviews here...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProductDetail
