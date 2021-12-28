import { useGlobalStore } from '@/hooks/useGlobalStore';
import router from 'next/router';
import React from 'react';
import { slugify } from '../helpers';
import SVG from 'react-inlinesvg';

export default function ProductDisplay({ product }) {
  const { role, setCurrentProduct } = useGlobalStore();

  const navigate = (product) => {
    setCurrentProduct({
      id: product.id,
      name: product.product_name,
    });

    router.push(`/products/${slugify(product.product_name)}`);
  };

  return (
    <div className='product-display relative top-0 left-0 my-2 cursor-pointer rounded shadow-sm p-3 border border-app-text-light'>
      <div className='bg-black p-1 absolute top-5 right-5 rounded'>
        {role === 'Reseller' ? (
          <span className='text-white'>
             {JSON.parse(product?.product_images).length} Images
          </span>
        ) : null}
      </div>
      <div className='product-display-image'>
        <img
          className='w-full flex center text-center items-center justify-center '
          src={
            JSON.parse(product?.product_images)[
              Math.floor(Math.random() * 5) + 1
            ]?.image
          }
        />
      </div>

      {role === 'Supplier' ? (
        <div className='flex justify-between'>
          <div className='flex flex-col my-2 mt-10'>
            <p>{product.product_name}</p>
            <span className='text-3xl font-bold'>₦{product.product_price}</span>
          </div>
          <div
            onClick={() => navigate(product)}
            className='text-app-text-light my-auto'
          >
            View Product
          </div>
        </div>
      ) : null}
      {role === 'Reseller' ? (
        <div>
          <p className='text-black font-medium text-lg'>
            {product.product_name}
          </p>
          <div className='flex justify-between'>
            <div className='flex flex-col my-2 '>
              <p className='text-app-text-light text-sm'>STARTING FROM</p>
              <span className='text-3xl font-bold'>
                ₦{product.product_price}
              </span>
              <span className='text-app-text-light font-thin line-through text-sm'>
                ₦50,000.00 (50% off)
              </span>
            </div>
            <div
              onClick={() => navigate(product)}
              className='flex bg-gray-200 text-sm p-2 my-auto rounded-full'
            >
              <SVG className='mx-2 my-auto' src='/svg/share.svg' />
              Share Product
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
