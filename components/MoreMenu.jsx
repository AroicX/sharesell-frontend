import React from 'react';
import Link from './Link';
import SVG from 'react-inlinesvg';

export default function MoreMenu() {
  const options = [
    {
      title: 'Chat With Support',
      link: '/',
      icon: 'support',
    },
    {
      title: 'How To (FAQ)',
      link: 'faq',
      icon: 'faq',
    },
    {
      title: 'About',
      link: 'about',
      icon: 'about-icon',
    },
    {
      title: 'Legal Agreements',
      link: 'legal',
      icon: 'legal',
    },
  ];
  return (
    // <div className='more-menu-modal'>
    <div
      className='more-menu w-full fixed left-0 bottom-16 mb-3 flex flex-col shadow rounded-md px-2  '
      style={{ zIndex: 1000 }}
    >
      {options.map((item, i) => (
        <Link
          key={i + 1}
          to={`${item.link}`}
          className='w-full bg-white hover:bg-app-cream flex flex-row p-3 border-b text-app-color border-app-color'
        >
          <SVG src={`/svg/${item.icon}.svg`} />
          <span className='mx-2'>{item.title}</span>
        </Link>
      ))}
      {/* </div> */}
    </div>
  );
}
