import React from 'react';

import Button from '@/reusable/Button';
import SVG from 'react-inlinesvg';
import Link from '@/components/Link';
import AuthProvider from '@/components/authProvider';
import { _protectedRequest } from 'services';
import useSWR from 'swr';
import { slugify } from '@/helpers/index';

export default function Product({ productsCategories }) {
  const { data, error } = useSWR(`/products/categories`, _protectedRequest);
  const categories = data?.payload?.data;

  return (
    <AuthProvider className='Product'>
      <h3 className='text-4xl mt-5'>Products</h3>
      {categories?.map((item, i) => (
        <Link
          to={`/products/${slugify(item.category_name)}`}
          className='w-full flex justify-between p-2 my-2'
          key={i + 1}
        >
          <span className='text-app-color font-medium'>
            {item.category_name}
          </span>
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
