import Navigation from 'components/navigation';
import React, { useState } from 'react';
import MoreMenu from '../MoreMenu';
import Head from './head';

export default function Layout({ children }) {
  const [menu, setMenu] = useState(false);
  return (
    <div className='app-layout pb-20'>
      <Head />
      {/* <p>layout</p> */}

      <div className='p-2 '>
        {menu ? <MoreMenu /> : null}
        {children}
      </div>
      <Navigation dispatch={(value) => setMenu(value)} />
    </div>
  );
}
