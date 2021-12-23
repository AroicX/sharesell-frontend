import { useRouter } from 'next/router';
import React from 'react';
import SVG from 'react-inlinesvg';

export default function AppHeader({ click = null }) {
  const router = useRouter();
  return (
    <div className='app-header w-full bg-white flex justify-between z-50'>
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
      <SVG className='my-auto' width='50px' src={'/svg/logo.svg'} />
    </div>
  );
}
