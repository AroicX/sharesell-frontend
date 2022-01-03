import React from 'react';
import SVG from 'react-inlinesvg';

export default function SearchBar({ handleSubmit, dispatch = () => {} }) {
  return (
    <form
      className='flex justify-between items-center p-3 border rounded mb-4'
      onSubmit={handleSubmit}
    >
      <input
        type={'text'}
        className='text-app-color w-11/12 outline-none'
        placeholder='Search for any product'
        onChange={(event) => dispatch(event.target.value)}
      />
      <SVG src='/svg/search-icon.svg' />
    </form>
  );
}
