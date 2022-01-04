import React from 'react';
import AppHeader from '@/components/AppHeader';
import { useRouter } from 'next/router';

export default function NotificationDetail({ notification, setCurrentStep }) {
  const back = () => {
    setCurrentStep((prev) => {
      return { ...prev, step: 1 };
    });
  };
  const Router = useRouter();
  const action = () => {
    Router.push('/profile/update-account');
  };
  return (
    <div className='mt-4'>
      <AppHeader noSVG styles='py-5' click={back} />
      <div className='mt-20'>
        <p className={`font-medium text-base text-app-text `}>
          Update your account
        </p>
        <p className='text-dark-grey text-xs my-3'>
          Time: 2:20pm, August 12 2020
        </p>
        <p className='text-app-color text-base'>
          Hey there, Kindly update your account to gain full access to
          ShareSell.
        </p>
        <p className='text-app-color text-base mt-6'>
          Tap the button to update.
        </p>
        <div className='flex items-center justify-center mt-10'>
          <button
            className='px-2 py-1 text-sm text-pry-black border border-pry-black rounded-sm'
            onClick={() => action()}
          >
            Update & Activate Account
          </button>
        </div>
      </div>
    </div>
  );
}
