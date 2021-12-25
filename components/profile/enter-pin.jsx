import React from 'react';
import AppHeader from '../AppHeader';
import PinContainer from '../pin-container';
import Infocard from '@/reusable/Infocard';
import Button from '@/reusable/Button';

export default function CreatePin({ next, back }) {
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
              Create Pin
            </p>
            <PinContainer />
            <Infocard
              text={
                'This will be the PIN you will use for all your transactions. Keep it safe and do not share it with anyone.'
              }
              icon={'/svg/info.svg'}
              style={'bg-app-cream mt-6 mb-5'}
            />
            <Button text={'Send'} iconRight={'/svg/arrow-right.svg'}/>
          </div>
        </div>
      </div>
    </div>
  );
}
