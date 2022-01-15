import React, { useState } from 'react';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import ProductDisplay from '../ProductDisplay';

export default function Orders() {
  const [order, setOrder] = useState('Shared');
  const { favourite, products } = useGlobalStore();
  const favouritedHandler = () => {
    let filter = products.filter((item) => item.id === favourite[item.id]);
    return filter;
  };
  let favouritedProduct = favouritedHandler();
  const OrderCategory = [
    { name: 'Shared' },
    { name: 'Favourited' },
    { name: 'Sold' },
  ];
  return (
    <div className='mt-4'>
      <h2 className='font-medium text-2xl text-pry-black mb-6'>Orders</h2>
      <div>
        <div className='flex justify-around items-center'>
          {OrderCategory.map((category, index) => (
            <p
              key={index}
              className={`text-base px-3 pb-1 ${
                order === category.name
                  ? 'border-pry-black border-b text-pry-black'
                  : 'text-app-color'
              } cursor-pointer`}
              onClick={() => setOrder(category.name)}
            >
              {category.name}
            </p>
          ))}
        </div>
        <div>
          {order === 'Shared' && (
            <div className='w-full bg-app-cream p-3 rounded mt-5 text-center shadow-sm'>
              <span className='text-app-color'>No Product Shared Yet</span>
            </div>
          )}
          {order === 'Favourited' && (
            <div className='w-full rounded mt-5'>
              {favouritedProduct.length !== 0 ? (
                favouritedProduct.map((item) => (
                  <ProductDisplay
                    product={item}
                    key={item.id}
                    favourite={favourite[item.id] ? true : false}
                  />
                ))
              ) : (
                <div className='text-center shadow-sm bg-app-cream p-3 mt-5'>
                  <span className='text-app-color'>
                    No Product Favourited Yet
                  </span>
                </div>
              )}
            </div>
          )}
          {order === 'Sold' && (
            <div className='w-full bg-app-cream p-3 rounded mt-5 text-center shadow-sm'>
              <span className='text-app-color'>No Product Sold Yet</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
