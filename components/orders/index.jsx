import React, { useState } from 'react';

export default function Orders() {
  const [order, setOrder] = useState('Shared');
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
            <div className='w-full bg-app-cream p-3 rounded mt-5 text-center shadow-sm'>
              <span className='text-app-color'>No Product Favourited Yet</span>
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
