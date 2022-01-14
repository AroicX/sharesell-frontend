import Link from '@/components/Link';
import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { useRouter } from 'next/router';

export default function Navigation({ dispatch }) {
  const [menu, setMenu] = useState(false);
  const Router = useRouter();
  useEffect(() => {
    dispatch(menu);
  }, [menu]);

  const navigationOptions = [
    {
      title: 'Home',
      icon: 'home',
      link: '/dashboard',
      darkIcon: 'home-dark',
    },
    {
      title: 'Products',
      icon: 'products',
      link: '/products',
      darkIcon: 'product-dark',
    },
    {
      title: 'Profile',
      icon: 'profile-icon',
      link: '/profile',
      darkIcon: 'profile-dark',
    },
    {
      title: 'More',
      icon: 'more',
      link: '#more',
      click: true,
    },
  ];

  const resellerNavigationOptions = [
    {
      title: 'Home',
      icon: 'home',
      link: '/dashboard',
      darkIcon: 'home-dark',
    },
    {
      title: 'Products',
      icon: 'products',
      link: '/products',
      darkIcon: 'product-dark',
    },
    {
      title: 'Orders',
      icon: 'orders-icon',
      link: '/orders',
      darkIcon: 'order-dark',
    },
    {
      title: 'Profile',
      icon: 'profile-icon',
      link: '/profile',
      darkIcon: 'profile-dark',
    },
    {
      title: 'More',
      icon: 'more',
      link: '#more',
      click: true,
    },
  ];

  const { role } = useGlobalStore();

  return (
    <div className='navigation'>
      <ul
        className='w-full flex justify-between p-1 fixed bottom-0 left-0 lg:fixed lg:bottom-0 lg:left-0 z-50'
        style={{ background: '#F6F5F5' }}
      >
        {role === 'Supplier' &&
          navigationOptions.map((item, i) => (
            <Link
              to={item.link}
              onClick={() => {
                item.click ? setMenu(!menu) : null;
              }}
              className={`flex p-2 flex-col center font-semibold text-xs justify-center items-center text-center cursor-pointer mx-1 ${
                Router.pathname === item.link
                  ? 'text-pry-black'
                  : 'text-app-text-light'
              }`}
              key={i + 1}
            >
              <SVG
                src={`/svg/${
                  Router.pathname === item.link ? item.darkIcon : item.icon
                }.svg`}
              />

              {item.title}
            </Link>
          ))}
        {role === 'Reseller' &&
          resellerNavigationOptions.map((item, i) => (
            <Link
              to={item.link}
              onClick={() => {
                item.click ? setMenu(!menu) : null;
              }}
              className={`flex p-2 flex-col center font-semibold text-xs justify-center items-center text-center cursor-pointer mx-1 ${
                Router.pathname === item.link
                  ? 'text-pry-black'
                  : 'text-app-text-light'
              }`}
              key={i + 1}
            >
              <SVG
                src={`/svg/${
                  Router.pathname === item.link ? item.darkIcon : item.icon
                }.svg`}
              />

              {item.title}
            </Link>
          ))}
      </ul>
    </div>
  );
}
