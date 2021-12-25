import React from 'react';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';

export default function Profile() {
  const ProfileOptions = [
    {
      icon: '/svg/home-profile.svg',
      title: 'Saved Pickup Address',
      detail: 'Add and edit pickup addresses',
      to: '/profile/pickup-address',
    },
    {
      icon: '/svg/history.svg',
      title: 'History',
      detail: 'View transaction and order history',
      to: '/profile/history',
    },
    {
      icon: '/svg/subscription.svg',
      title: 'Subscription',
      detail: 'Manage your sharesell subscription',
      to: 'profile/subscription',
    },
    {
      icon: '/svg/wallet.svg',
      title: 'Make a Withdrawal',
      detail: 'Withdraw cash to your account',
      to: '/profile/wallet',
    },
    {
      icon: '/svg/lock.svg',
      title: 'Change Password',
      detail: 'Manage Password',
      to: '/profile/change-password',
    },
    {
      icon: '/svg/logout.svg',
      title: 'Logout',
      detail: 'Exit account',
      to: '/',
    },
  ];

  const Router = useRouter();
  return (
    <div className='profile'>
      <h2 className='text-3xl font-light my-2'>Profile</h2>
      <div className='flex items-center my-4'>
        <div className='profile-image-container flex items-center justify-center h-20 w-20 rounded-full relative'>
          <p className='font-medium text-2xl text-app-cream'>CI</p>
          <div className='flex justify-center items-center bg-app-cream h-8 w-8 rounded-full absolute profile-svg'>
            <SVG width='50px' src={'/svg/picture.svg'} />
          </div>
        </div>
        <div className='flex flex-col ml-4'>
          <p className='font-semibold text-base'>Chika Inc</p>
          <p className='text-xs text-app-text'>Sirmudiadavid@gmail.com</p>
          <div
            className='flex justify-center items-center h-6 min-w-max relative mt-2 rounded-sm border border-pry-black cursor-pointer' 
            onClick={() => Router.push('profile/update-account')}
          >
            <p className='text-sm px-1'>Update & Activate Account</p>
            <div className='absolute w-2 h-2 rounded-full bg-terms profile-notification'></div>
          </div>
        </div>
      </div>
      <div className='profile-options mt-8'>
        {ProfileOptions.map((option, index) => (
          <div
            key={index}
            className='flex pt-5 cursor-pointer'
            onClick={() => Router.push(option.to)}
          >
            <div className='w-30 mr-6'>
              <SVG src={option.icon} className='max-w-full' />
            </div>
            <div
              className={`flex w-full justify-between ${
                index !== ProfileOptions.length - 1 ? 'border-b ' : ''
              } border-app-cream pb-2`}
            >
              <div className='flex flex-col'>
                <p className='text-app-text font-medium text-base'>
                  {option.title}
                </p>
                <p className='text-app-color text-xs'>{option.detail}</p>
              </div>
              <SVG src='/svg/next-app-color.svg' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
