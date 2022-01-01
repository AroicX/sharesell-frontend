import React, { useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';

export default function Modal({ title, toggle, dispatch, children }) {
  return (
    <div className={`modal ${toggle ? 'block' : 'hidden'}`}>
      <div className='modal-content'>
        <div className='modal-content-header'>
          <span className='text-black'>{title}</span>
          <SVG
            className='bg-red-50 rounded-full cursor-pointer'
            src='/svg/modal-close.svg'
            onClick={() => dispatch(false)}
          />
        </div>
        <div className='py-5'>{children}</div>
      </div>
    </div>
  );
}
