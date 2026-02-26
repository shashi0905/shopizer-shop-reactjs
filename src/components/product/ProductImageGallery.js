import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";

import Swiper from "react-id-swiper";
import 'swiper/swiper.scss'

const ProductImageGallery = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [currentImage, setCurrentImage] = useState(
    product.images && product.images.length > 0 ? product.images[0].imageUrl : null
  )

  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: false,
    effect: "fade"
  };

  const thumbnailSwiperParams = {
    getSwiper: product.images && product.images.length > 4 && getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: false,
    slideToClickedSlide: true,
    navigation: {
      nextEl: product.images && product.images.length > 4 ? ".swiper-button-next" : '',
      prevEl: product.images && product.images.length > 4 ? ".swiper-button-prev" : ''
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };

  if (!product.images || product.images.length === 0) {
    return (
      <div className="product-large-image-wrapper">
        {product.badges && product.badges.length > 0 && (
          <div className="product-img-badges">
            {product.badges.map((badge, index) => (
              <span
                key={index}
                className={`badge-${badge.code}`}
                style={{ backgroundColor: badge.color }}
              >
                {badge.code === 'sale' && badge.value ? `-${badge.value}%` : badge.label}
              </span>
            ))}
          </div>
        )}
        <div className="single-image">
          <img
            src="https://via.placeholder.com/500x500?text=No+Image"
            className="img-fluid"
            alt="No product image"
          />
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {product.badges && product.badges.length > 0 && (
          <div className="product-img-badges">
            {product.badges.map((badge, index) => (
              <span
                key={index}
                className={`badge-${badge.code}`}
                style={{ backgroundColor: badge.color }}
              >
                {badge.code === 'sale' && badge.value ? `-${badge.value}%` : badge.label}
              </span>
            ))}
          </div>
        )}
        <LightgalleryProvider>
          <Swiper {...gallerySwiperParams}>
            {product.images.map((single, key) => (
              <div key={key}>
                <LightgalleryItem group="any" src={single.imageUrl}>
                  <button>
                    <i className="pe-7s-expand1"></i>
                  </button>
                </LightgalleryItem>
                <div className="single-image">
                  <img src={currentImage} className="img-fluid" alt="" />
                </div>
              </div>
            ))}
          </Swiper>
        </LightgalleryProvider>
      </div>
      {product.images.length > 1 && (
        <div className="product-small-image-wrapper mt-15">
          <Swiper {...thumbnailSwiperParams}>
            {product.images.map((single, key) => (
              <div key={key}>
                <div className="single-image">
                  <img
                    onClick={() => setCurrentImage(single.imageUrl)}
                    src={single.imageUrl}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            ))}
          </Swiper>
        </div>
      )}
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object
};

export default ProductImageGallery;
