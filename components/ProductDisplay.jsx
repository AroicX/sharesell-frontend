import { useGlobalStore } from '@/hooks/useGlobalStore';
import router from 'next/router';
import React from 'react';
import { slugify } from '../helpers';
// import Link from './Link';

export default function ProductDisplay({ product }) {
  const { setCurrentProduct } = useGlobalStore();
  const navigate = (product) => {
    setCurrentProduct({
      id: product.id,
      name: product.product_name,
    });

    router.push(`/products/${slugify(product.product_name)}`);
  };

  return (
    <div className='product-display my-2 cursor-pointer rounded shadow-sm p-3 border border-app-text-light'>
      <img
        className='w-full flex center text-center items-center justify-center '
        height='200px'
        src={
          JSON.parse(product.product_images)[Math.floor(Math.random() * 5) + 1]
            ?.image
        }
      />
      <div className='flex justify-between'>
        <div className='flex flex-col my-2'>
          <p>{product.product_name}</p>
          <span className='text-3xl font-bold'>₦{product.product_price}</span>
        </div>
        <div
          onClick={() => navigate(product)}
          // to={}
          className='text-app-text-light my-auto'
        >
          View Product
        </div>
      </div>
    </div>
  );
}
