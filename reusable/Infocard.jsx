import React from 'react';
import SVG from 'react-inlinesvg';

export default function Infocard({ text, style, icon }) {
  return (
    <div
      className={`bg-yellow-100 py-5 p-3 flex flex-row my-2 opacity-90 round ${style} rounded cursor-pointer`}
    >
      {icon ? <SVG className='mr-4' src={icon} width='50px' /> : null}
      <p className=' text-app-text'>{text}</p>
    </div>
  );
}
