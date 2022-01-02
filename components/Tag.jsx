import React from 'react';

export default function Tag({ tag, click }) {
  return (
    <div
      className='flex items-center justify-center rounded-2xl p-2 bg-app-cream min-w-max mx-2 cursor-pointer mb-4'
      onClick={click}
    >
      <p className='text-sm font-medium text-app-text'>{tag.category_name}</p>
    </div>
  );
}
