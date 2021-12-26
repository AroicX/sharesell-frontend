import React from 'react';
import AppHeader from '@/components/AppHeader';
import SVG from 'react-inlinesvg';
import Button from '@/reusable/Button';

export default function EmptyAccount({ back, next }) {
  return (
    <div className='mt-4'>
      <AppHeader noSVG click={back} />
      <div className=''>
        <h2 className='text-3xl font-light my-4'>Accounts</h2>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex items-center justify-center relative my-6'>
            <SVG src='/svg/add-account-back.svg' />
            <SVG src='/svg/add-account.svg' className='absolute' />
          </div>
          <p className='font-semibold text-base text-app-text text-center w-64 mt-8 mb-5'>
            You have not added any account for us to send your money to
          </p>
          <Button text={'Add a Bank Account'} iconRight={"/svg/plus-circle.svg"} click={next}/>
        </div>
      </div>
    </div>
  );
}
