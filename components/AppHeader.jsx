import { useRouter } from 'next/router';
import React from 'react';
import SVG from 'react-inlinesvg';
import Link from './Link';
import { useGlobalStore } from '@/hooks/useGlobalStore';

export default function AppHeader({
  click = null,
  noSVG,
  styles,
  edit,
  product = null,
}) {
  const router = useRouter();
  const { setCurrentProduct } = useGlobalStore();
  const editPageHandler = () => {
    setCurrentProduct({
      id: product.id,
      name: product.product_name,
    });
    router.push('/products/edit-product');
  };
  return (
    <div
      className={`app-header w-full px-2 bg-white flex justify-between z-50 ${styles}`}
    >
      <button
        className='flex my-auto'
        onClick={
          click
            ? click
            : () => {
                router.back();
              }
        }
      >
        <SVG src={'/svg/arrrow-left.svg'} />
        <span>Back</span>
      </button>
      {noSVG ? (
        ''
      ) : (
        <Link to='/dashboard'>
          <SVG className='my-auto' width='50px' src={'/svg/logo.svg'} />
        </Link>
      )}
      {edit ? (
        <div
          className='flex items-center cursor-pointer'
          onClick={() => editPageHandler()}
        >
          <SVG src='/svg/edit-circle.svg' className='mr-1' />
          <p className='font-medium text-sm text-app-text'>Edit Product</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
