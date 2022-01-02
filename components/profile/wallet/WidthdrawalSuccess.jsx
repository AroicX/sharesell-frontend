import React from 'react';
import SVG from 'react-inlinesvg';
import Button from 'reusable/Button';
import { useRouter } from 'next/router';

export default function WidthdrawalSuccess() {
  const Router = useRouter();
  return (
    <div className='mt-5 flex flex-col justify-center items-center'>
      <SVG src='/svg/success-icon.svg' className='mt-4 mb-3' />
      <p className='font-bold text-2xl text-pry-black'>Tansaction Successful</p>
      <div className='flex items-center justify-center relative my-8'>
        <SVG src='/svg/sub-success.svg' className='absolute z-10' />
        <SVG src='/svg/sub-success-back.svg' />
      </div>
      <p className='font-bold text-app-text text-sm w-36 text-center mb-8'>
        You sent N200,000 to your account
      </p>
      <Button
        style='bg-app-color'
        text={`Return Home`}
        iconRight={'/svg/arrow-right.svg'}
        click={() => Router.push('/dashboard')}
      />
    </div>
  );
}
