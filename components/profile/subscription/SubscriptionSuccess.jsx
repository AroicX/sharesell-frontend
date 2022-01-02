import React from 'react';
import SVG from 'react-inlinesvg';
import Button from 'reusable/Button';
import { useRouter } from 'next/router';

export default function SubscriptionSuccess({ subscriptionStep }) {
  const Router = useRouter();
  return (
    <div className='mt-10 flex flex-col justify-center items-center'>
      <p className='font-bold text-2xl text-pry-black'>Tansaction Successful</p>
      <div className='flex items-center justify-center relative my-8'>
        <SVG src='/svg/sub-success.svg' className='absolute z-10' />
        <SVG src='/svg/sub-success-back.svg' />
      </div>
      <p className='font-bold text-app-text text-sm w-48 text-center mb-8'>{`You just subscribed to the ShareSell ${subscriptionStep.name} Plan`}</p>
      <Button
      style="bg-app-color"
        text={`Return Home`}
        iconRight={'/svg/arrow-right.svg'}
        click={() => Router.back()}
      />
    </div>
  );
}
