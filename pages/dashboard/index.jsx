import React from 'react';

import Layout from 'components/layout';
import Link from 'components/link';
import ProductDisplay from 'components/ProductDisplay';
import WithdrawalDisplay from 'components/WithdrawalDisplay';
import AuthProvider from 'components/AuthProvider';

export default function Dashboard() {
  return (
    <AuthProvider>
      <Layout>
        <div className='w-full bg-white p-2 flex fixed top-0 left-0 z-50 shadow'>
          <img
            className='border-50  '
            src='/images/Image.png'
            alt='image'
            width='50px'
            height='50px'
          />
          <Link to='/settings' className='text-app-color m-auto'>
            Hi, Tap here to update account
          </Link>
        </div>
        <div className='mt-20'>
          <WithdrawalDisplay />
          <div className='flex justify-between'>
            <span className='text-app-text font-medium'>Recent Products</span>
            <Link to='/' className='text-app-color text-sm my-auto'>
              See All
            </Link>
          </div>
        </div>
        {[...Array(20)].map((item, i) => (
          <ProductDisplay key={i + 1} />
        ))}
      </Layout>
    </AuthProvider>
  );
}
