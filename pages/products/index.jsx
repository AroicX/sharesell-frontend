import React from 'react';

import Button from 'reusable/Button';
import SVG from 'react-inlinesvg';
import Link from 'components/link';
import AuthProvider from 'components/AuthProvider';
import { slugify } from 'helpers';

export default function Product({}) {
  const categories = [
    'Plant Products',
    'Women’s Fashion',
    'Men’s Fashion',
    'Electronics',
    'Health & Welness',
  ];

  return (
    <AuthProvider className='Product'>
      <h3 className='text-4xl mt-5'>Products</h3>
      {categories.map((item, i) => (
        <Link
          to={`/products/${slugify(item)}`}
          className='w-full flex justify-between p-2 my-2'
          key={i + 1}
        >
          <span className='text-app-color font-medium'>{item}</span>
          <SVG className='text-app-color' src='/svg/chevron-right.svg' />
        </Link>
      ))}
      <Button
        iconLeft='/svg/plus-icon.svg'
        text='Add Product'
        styles='fixed bottom-10 right-2 block w-12 bg-black rounded-full w-44 z-50'
        to='/products/add-product'
        style={{ background: '#000 !important' }}
      />
    </AuthProvider>
  );
}
