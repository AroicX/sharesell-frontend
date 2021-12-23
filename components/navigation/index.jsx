import Link from 'components/link';
import React from 'react';
import SVG from 'react-inlinesvg';

export default function Navigation({}) {
  const navigationOptions = [
    {
      title: 'Home',
      icon: 'home',
      link: '/dashboard',
    },
    {
      title: 'Products',
      icon: 'products',
      link: '/products',
    },
    {
      title: 'Profile',
      icon: 'profile-icon',
      link: '/profile',
    },
    {
      title: 'More',
      icon: 'more',
      link: '/settings',
    },
  ];

  return (
    <div className='navigation'>
      <ul
        className='w-full flex justify-between p-1 fixed bottom-0 left-0 lg:fixed lg:bottom-0 lg:left-0 z-50'
        style={{ background: '#F6F5F5' }}
      >
        {navigationOptions.map((item, i) => (
          <Link
            to={item.link}
            className='flex p-2 flex-col center justify-center items-center text-center cursor-pointer mx-1 text-app-text-light'
            key={i + 1}
          >
            <SVG src={`/svg/${item.icon}.svg`} />

            {item.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}
