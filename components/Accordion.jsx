import React, { useState, ueseRef, useRef } from 'react';
import SVG from 'react-inlinesvg';

export default function Accourdion({ faq }) {
  const [isActive, setIsActive] = useState(false);
  const [maxHeight, setMaxHeight] = useState('0px');
  const content = useRef();
  const toggle = () => {
    setIsActive(!isActive);
    setMaxHeight(isActive ? '0px' : `${content.current.scrollHeight}px`);
  };
  return (
    <div className='flex flex-col w-full'>
      <button
        className='flex items-center justify-between border-b border-lightest-color pb-2'
        onClick={() => toggle()}
      >
        <p className='text-sm w-64 text-left'>{faq.question}</p>
        {isActive ? (
          <SVG src='/svg/faq-minus.svg' />
        ) : (
          <SVG src='/svg/faq-plus.svg' />
        )}
      </button>
      <div
        className={`mt-4 overflow-hidden ${isActive ? 'mb-10' : ''}`}
        style={{
          maxHeight: `${maxHeight}`,
          transition: 'max-height 0.3s ease',
        }}
        ref={content}
      >
        <p className='text-xs text-app-color mb-3'>{faq.answer}</p>
        {faq.image && <img src={faq.image} />}
      </div>
    </div>
  );
}
