import React from 'react';
import Link from './Link';

export default function ProductDisplay({}) {
  return (
    <div className='product-display my-2  cursor-pointer'>
      <img
        className='w-full flex center text-center items-center justify-center '
        src='/images/product.png'
      />
      <div className='flex justify-between'>
        <div className='flex flex-col my-2'>
          <p>Classic Romper</p>
          <span className='text-3xl font-bold'>₦25,000.00</span>
        </div>
        <Link to='/' className='text-app-text-light my-auto'>
          View Product
        </Link>
      </div>
    </div>
  );
}
