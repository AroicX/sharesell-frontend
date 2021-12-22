import React from 'react';
import SVG from 'react-inlinesvg';

export default function AppHeader({click}) {
  return (
    <div className='app-header flex justify-between'>
      <button className='flex my-auto' onClick={click}>
        <SVG src={'/svg/arrrow-left.svg'} />
        <span>Back</span>
      </button>
      <SVG className='my-auto' width='50px' src={'/svg/logo.svg'} />
    </div>
  );
}
