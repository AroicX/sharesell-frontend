import React from 'react';
import SVG from 'react-inlinesvg';

export default function SubscriptionTab({ subscription }) {
  return (
    <div className='subscription-tab rounded-lg p-4 mt-6'>
      <div className='flex justify-between items-center'>
        <SVG src={subscription.icon} />
        <div className='flex flex-col'>
          <p className='text-pry-black font-extrabold text-base ml-auto'>
            {subscription.price}
          </p>
          <p className='text-app-text text-xs uppercase'>
            {subscription.duration}
          </p>
        </div>
      </div>
      <div className='flex items-center mt-6'>
        <p className='font-bold text-2xl text-app-text mr-4'>{subscription.name}</p>
        {subscription.isActive && (
          <div className='bg-light-green px-4 py-1 rounded-xl'>
            <p className='font-medium text-xs text-pry-black'>Active</p>
          </div>
        )}
      </div>
      <p className='text-app-color font-medium text-xs mt-3'>{subscription.details}</p>
      {subscription.isActive === false ? <div className='flex items-center mt-3 max-w-max ml-auto cursor-pointer'>
          <p className='font-medium text-xs text-terms mr-3'>Subscribe</p>
          <SVG src='/svg/sub-arrow.svg'/>
      </div> : ""}
      
    </div>
  );
}
