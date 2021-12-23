import Link from 'components/link';
import React from 'react';
import SVG from 'react-inlinesvg';

export default function Splash() {
  return (
    <div
      className='flex flex-col center items-center justify-center'
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <Link className='bounce' to='/dashboard'>
        <SVG src='/svg/logo.svg' />
      </Link>
    </div>
  );
}
