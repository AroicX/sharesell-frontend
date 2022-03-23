import Link from '@/components/Link';
import React from 'react';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';

export default function Splash() {
  const Router = useRouter();

  React.useEffect(() => {
    setTimeout(() => {
      const accessToken = localStorage.getItem('user-data');

      if (!accessToken) {
        localStorage.setItem('be-authorized', window.location.pathname);
        Router.replace('/login');
        return null;
      } else {
        Router.replace('/dashboard');
      }
    }, 4000);
  }, []);
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
