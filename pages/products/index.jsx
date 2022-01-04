import React, { useEffect } from 'react';
import Button from '@/reusable/Button';
import SVG from 'react-inlinesvg';
import Link from '@/components/Link';
import AuthProvider from '@/components/AuthProvider';
import { _protectedRequest } from 'services';
import useSWR from 'swr';
import { slugify } from '@/helpers/index';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { useRouter } from 'next/router';
import AppHeader from '@/components/AppHeader';

export default function Product({}) {
  const router = useRouter();
  const { role, setProductCategories, setCurrentCategory } = useGlobalStore();
  const { data, error } = useSWR(`/products/categories`, _protectedRequest);
  const categories = data?.payload?.data || [];

  useEffect(() => {
    if (categories.length > 0) {
      setProductCategories(categories);
    }
  }, [categories]);

  const navigate = (category) => {
    setCurrentCategory({
      id: category.category_id,
      name: category.category_name,
    });

    router.push(`/products/category/${slugify(category.category_name)}`);
  };

  return (
    <AuthProvider className='Product'>
      <AppHeader />
      <h3 className='text-4xl mt-20'>Products</h3>
      {categories?.map((item, i) => (
        <div
          key={i + 1}
          className='w-full flex justify-between p-2 my-2 cursor-pointer'
          onClick={() => navigate(item)}
        >
          <span className='text-app-color font-medium'>
            {item.category_name}
          </span>
          <SVG className='text-app-color' src='/svg/chevron-right.svg' />
        </div>
      ))}
      {role === 'Supplier' && (
        <Button
          iconLeft='/svg/plus-icon.svg'
          text='Add Product'
          styles='fixed bottom-10 right-2 block w-12 bg-black rounded-full w-44 z-50'
          to='/products/add-product'
          style={{ background: '#000 !important' }}
        />
      )}
    </AuthProvider>
  );
}
