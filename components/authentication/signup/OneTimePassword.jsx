import React from 'react';

import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import AppHeader from '@/components/AppHeader';

export default function OneTimePassword({ next, back }) {
  return (
    <div className='phoneVerification'>
      <AppHeader click={back} />
      <div className='verification'>
        <h2 className='text-3xl font-light my-2'>Verification</h2>
        <span className='text-app-text'>
          Enter the OTP sent to your phone number
        </span>
        <div className='flex flex-col mt-2'>
          <Input label={'OTP'} type='text' placeholder={'Enter OTP'} />
          <Button
            styles={'p-5 block '}
            text='Verify'
            iconRight={'/svg/arrow-right.svg'}
            click={next}
          />
        </div>
        <div className='mt-32 flex flex-col justify-center items-center'>
          <h4 className='font-bold text-app-text text-base'>0:32</h4>
          <span className='w-full p-2 flex center justify-center text-center'>
            08172948114 |
            <a className='mx-2 underline font-medium' href='#'>
              Change Phone Number
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
