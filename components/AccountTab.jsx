import React, { useState } from 'react';
import SVG from 'react-inlinesvg';

export default function AccountTab({
  account,
  id,
  setSelected,
  styles,
  isActive,
}) {
  const onChangeHandler = () => {
    setSelected(id);
  };
  return (
    <div
      className={`flex items-center p-3 mt-4 rounded border cursor-pointer ${
        isActive
          ? 'border-app-text-light bg-app-cream '
          : 'border-app-color bg-white'
      }'
      }`}
      onClick={() => onChangeHandler()}
    >
      <div className='account-tab-logo flex justify-center items-center'>
        <SVG src={account.logo} />
      </div>
      <div className='w-full flex justify-between ml-4'>
        <div className='flex flex-col'>
          <p className='font-semibold text-pry-black text-base w-48'>
            {account.name}
          </p>
          <p className='text-xs font-semibold text-app-color'>{account.bank}</p>
          <p className='text-sm text-pry-black'>{account.number}</p>
        </div>
        {isActive ? (
          <SVG src='/svg/pick.svg' />
        ) : (
          <div className='account-tab-selected-radio rounded-full border border-app-text'></div>
        )}
      </div>
    </div>
  );
}
