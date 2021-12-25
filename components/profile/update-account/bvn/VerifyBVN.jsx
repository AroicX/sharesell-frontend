import React from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';

export default function VerifyBVN({ next, back }) {
  return (
    <div className='mt-4'>
      <AppHeader noSVG click={back} />
      <div className='mt-4'>
        <h2 className='text-3xl font-light my-2'>Verification</h2>
        <span className='text-app-text'>
          Enter the OTP sent to the phone number connected to your BVN.
        </span>
        <div>
          <div className='my-7'>
            <Input label={'OTP'} placeholder={'Enter OTP'} />
          </div>
          <Button
            text={'Verify OTP'}
            iconRight={'/svg/arrow-right.svg'}
            click={next}
          />
          <div className='flex items-center justify-center mt-9'>
            <p className='font-bold text-app-text text-base'>0:32</p>
          </div>
        </div>
      </div>
    </div>
  );
}
