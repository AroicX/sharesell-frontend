import React from 'react';
import SVG from 'react-inlinesvg';
import Button from 'reusable/Button';
import { useRouter } from 'next/router';

export default function BVNSuccess() {
  const Router = useRouter();
  return (
    <div className='mt-5 flex flex-col justify-center items-center'>
      <SVG src='/svg/success-icon.svg' className='mt-4 mb-3' />
      <p className='font-bold text-2xl text-pry-black'>Verification Successful</p>
      <div className='flex items-center justify-center relative my-8'>
        <SVG src='/svg/bvn-success.svg' className='' />
      </div>

      <Button
      style="bg-app-color"
        text={`Return to Update`}
        iconRight={'/svg/arrow-right.svg'}
        click={() => Router.push('/profile/update-account')}
      />
    </div>
  );
}
