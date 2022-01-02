import React from 'react';
import SVG from 'react-inlinesvg';

export default function SearchBar() {
  return (
    <div className='flex justify-between items-center p-3 border rounded mb-4'>
      <input type={'text'} className='text-app-color w-11/12 outline-none' placeholder='Search for any product'/>
      <SVG src='/svg/search-icon.svg' />
    </div>
  );
}
