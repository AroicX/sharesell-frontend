import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';

export default function SubscriptionCheckout({
  subscriptionStep,
  setSubscriptionStep,
}) {
  const [cardNumber, setCardNumber] = useState('');
  const cardNumberHandler = (data) => {
    setCardNumber(data);
  };
  return (
    <div className='mt-4'>
      <AppHeader noSVG click={() => setSubscriptionStep({ step: 1 })} />
      <div>
        <h2 className='text-3xl font-light my-4'>{`Pay for ${subscriptionStep.name} Plan`}</h2>
        <div className='mt-6'>
          <div className='mt-9'>
            <Input
              label={'Name on Card'}
              placeholder={'Osamudiamen Imasuen'}
              type='text'
            />
          </div>
          <div className='mt-9'>
            <Input
              label={'Card Number'}
              placeholder={'1292-3923-9492-3992'}
              type='text'
              dispatch={(data) => cardNumberHandler(data)}
              value={cardNumber}
              rest={{"maxLength": "14"}}
            />
          </div>
          <div className='flex items-center justify-between max-w-full mt-7 mb-4'>
            <div className='mr-3'>
              <Input label={'Exp Date'} placeholder={'12/25'} type='text' />
            </div>
            <div>
              <Input label={'CVV'} placeholder={'302'} type='text' />
            </div>
          </div>
          <Button
          style="bg-app-color"
            text={`Pay ${subscriptionStep.price}`}
            iconRight={'/svg/arrow-right.svg'}
            click={() => setSubscriptionStep((prev) => ({ ...prev, step: 3 }))}
          />
        </div>
      </div>
    </div>
  );
}
