import React from 'react';
import AppHeader from '@/components/AppHeader';
import PinContainer from '@/components/PinContainer';
import Button from '@/reusable/Button';
import Link from '@/components/Link';

export default function EnterPin({ next, back }) {
  return (
    <div className='mt-4'>
      <AppHeader noSVG click={back} />
      <div>
        <h2 className='text-2xl font-medium text-pry-black my-4'>
          Review and Send
        </h2>
        <div className='mt-6'>
          <div className='flex flex-col border-b'>
            <div className='flex items-center justify-between mb-3'>
              <p className='font-semibold text-base text-pry-black'>Amount</p>
              <p className='text-app-text text-sm'>N200,000</p>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <p className='font-semibold text-base text-pry-black'>Fees</p>
              <p className='text-app-text text-sm'>N100</p>
            </div>
          </div>
          <div className='flex items-center justify-between mt-2 mb-3'>
            <p className='font-semibold text-base text-pry-black'>Total</p>
            <p className='text-app-text text-sm'>N200,100</p>
          </div>
          <div className='flex flex-col items-center justify-center mt-12'>
            <p className='text-pry-color font-semibold text-lg text-center'>
              Enter Pin
            </p>
            <PinContainer />
            <Link to={'/'} className='underline text-sm font-semibold text-app-text mb-10 mt-4'>
              Forgot Pin?
            </Link>
            <Button
            style="bg-app-color"
              text={'Send'}
              iconRight={'/svg/arrow-right.svg'}
              click={next}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
