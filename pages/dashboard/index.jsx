import React from 'react';

import Layout from '@/components/layout';
import Link from '@/components/Link';
import ProductDisplay from '@/components/ProductDisplay';
import WithdrawalDisplay from '@/components/WithdrawalDisplay';
import AuthProvider from '@/components/AuthProvider';
import { useGlobalStore } from '@/hooks/useGlobalStore';

export default function Dashboard() {
  const { products } = useGlobalStore();
  return (
    <AuthProvider>
      <Layout>
        <div className='w-full bg-white p-2 flex justify-between fixed top-0 left-0 z-50 shadow'>
          <img
            className='border-50  '
            src='/images/Image.png'
            alt='image'
            width='50px'
            height='50px'
          />
          <Link to='/profile' className='text-app-color m-auto'>
            Hi, Tap here to update account
          </Link>
          <div className='relative my-auto'>
            <div className=' absolute top-0 right-0 z-10 bg-terms p-1 rounded-full border border-2 border-white '></div>
            <button className='relative px-2 block my-auto bg-terms text-white rounded'>
              3
            </button>
          </div>
        </div>
        <div className='mt-20'>
          <WithdrawalDisplay />
          <div className='flex justify-between'>
            <span className='text-app-text font-medium'>Recent Products</span>
            <Link to='/products' className='text-app-color text-sm my-auto'>
              See All
            </Link>
          </div>
        </div>
        {products.length > 0 ? (
          products?.map((item, i) => (
            <ProductDisplay key={i + 1} product={item} />
          ))
        ) : (
          <div className='w-full bg-app-cream p-3 rounded mt-5 text-center shadow-sm'>
            <span className='text-app-color'>No Product Found</span>
          </div>
        )}
        {/* {[...Array(20)].map((item, i) => (
          <ProductDisplay key={i + 1} />
        ))} */}
      </Layout>
    </AuthProvider>
  );
}
