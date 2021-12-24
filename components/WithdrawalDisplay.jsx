import React from 'react';
import SVG from 'react-inlinesvg';
export default function WithdrawalDisplay() {
  return (
    <div
      className='w-full relative bg-black flex flex-col text-center center items-center justify-center my-5 shadow  p-2 rounded'
      style={{
        height: '200px',
        backgroundImage: `url('/images/bg-lines.png')`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      <SVG
        className='absolute top-5 left-5 cursor-pointer'
        src='/svg/withdrawal.svg'
      />
      <div className='flex flex-col text-center center items-center justify-center'>
        <p className='text-white mt-10'>Total Revenue</p>
        <p className='text-white text-4xl font-bold'>
          <span className='text-white text-2xl'>₦</span>200,500.00
        </p>
        <button className=' block text-white p-2 border border-white rounded mt-5'>
          Withdraw
        </button>
      </div>
    </div>
  );
}
