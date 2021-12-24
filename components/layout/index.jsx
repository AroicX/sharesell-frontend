import Navigation from '@/components/navigation';
import React from 'react';

export default function Layout({ children }) {
  return (
    <div className='app-layout pb-20'>
      {/* <p>layout</p> */}
      <div className='p-2'>{children}</div>
      <Navigation />
    </div>
  );
}
