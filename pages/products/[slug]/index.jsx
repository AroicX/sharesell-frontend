import AppHeader from '@/components/AppHeader';
import ImageModal from '@/components/ImageModal';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { GET_SINGLE_PRODUCT } from '@/services/products';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';

export default function ProductSlug() {
  const { productCategories, currentProduct } = useGlobalStore();

  const [product, setProduct] = useState([]);
  const [imageOptions, setImageOptions] = useState([]);

  useEffect(() => {
    if (currentProduct.length < 1) {
      router.back();
    } else {
      getProduct(currentProduct.id);
    }
  }, [currentProduct]);

  const getProduct = (id) => {
    const callback = (response) => {
      const { payload } = response;
      let images = JSON.parse(payload.product_images);
      var image_filtered = [];
      images.forEach((img, i) => {
        if (i === 0) {
          image_filtered.push({
            src: img.image,
            width: 4,
            height: 3,
          });
        } else {
          image_filtered.push({
            src: img.image,
            width: 3,
            height: 3,
          });
        }
      });

      setImageOptions(image_filtered);

      setProduct(payload);
    };
    const onError = (error) => {
      console.log(error);
    };
    GET_SINGLE_PRODUCT(id, callback, onError);
  };
  return (
    <div className='product-slug'>
      <AppHeader edit='Edit Product' />

      <h3 className='text-3xl mt-5'>Product Details</h3>
      <div className='w-full flex flex-col mt-5'>
        <p className='text-app-text'>{product.product_name}</p>
        <ImageModal photos={imageOptions} />

        <div className='flex flex-col my-3 p-2'>
          <span className='text-app-color font-medium'>
            Product Description
          </span>
          <p>{product.product_description}</p>
        </div>
        <div className='flex justify-between p-2'>
          <div className='flex flex-col '>
            <p className='text-app-color font-medium'>Weight</p>
            <span className='font-light'>{product.product_weight}</span>
          </div>
          <div className='flex flex-col '>
            <p className='text-app-color font-medium'>Size</p>
            <span className='font-light'>{product.product_size}</span>
          </div>
          <div className='flex flex-col '>
            <p className='text-app-color font-medium'>Stock Left</p>
            <span className='font-light'>{product.product_number}</span>
          </div>
        </div>
        <div className='flex  justify-between p-2'>
          <div className='flex flex-col '>
            <p className='text-app-color font-medium'>Product Price</p>
            <span className='font-light'>N{product.product_price}</span>
          </div>

          <div className='flex flex-col mx-5'>
            <p className='text-app-color font-medium'>Suggested Retail Price</p>
            <span className='font-light'>N{product.product_retail_price}</span>
          </div>
        </div>
        <div className='flex p-2'>
          <div className='flex flex-col '>
            <p className='text-app-color font-medium'>Product Quantity</p>
            <span className='font-light'>{product.product_quantity}</span>
          </div>
        </div>

        {/* <Button
          iconLeft='/svg/delete-bin.svg'
          text='Delete'
          styles='w-44 bg-red-50 text-red-500'
        /> */}
        <div className='w-full flex center items-center justify-center mt-10 pb-52'>
          <button className='flex bg-red-50 p-3 px-7 rounded transition-all hover:bg-red-200'>
            <span className='text-red-500 m-auto'>Delete</span>
            <SVG
              className='text-red-500 m-auto mx-1'
              src='/svg/delete-bin.svg'
            />
          </button>
        </div>
      </div>
    </div>
  );
}
