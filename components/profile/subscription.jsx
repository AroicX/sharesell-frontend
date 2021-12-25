import React from 'react';
import AppHeader from 'components/AppHeader';
import Infocard from 'reusable/Infocard';
import SubscriptionTab from 'components/subscription-tab';

export default function Subscription({ setSubscriptionStep }) {
  const plans = [
    {
      name: 'Free Plan',
      price: 'Free',
      duration: 'per month',
      icon: '/svg/free.svg',
      details:
        'Upload up to 5 products. You also pay a 7% commission on each product sold.',
      isActive: true,
    },
    {
      name: 'Basic',
      price: '₦1,500',
      duration: 'per month',
      icon: '/svg/basic.svg',
      details:
        'Upload up to 5 products. You also pay a 5% commission on each product sold.',
      isActive: false,
    },
    {
      name: 'Standard',
      price: '₦3,500',
      duration: 'per month',
      icon: '/svg/standard.svg',
      details:
        'Upload up to 5 products. You also pay a 4% commission on each product sold.',
      isActive: false,
    },
    {
      name: 'Premium',
      price: '₦5,000',
      duration: 'per month',
      icon: '/svg/premium.svg',
      details:
        'Upload up to 5 products. You also pay a 3% commission on each product sold.',
      isActive: false,
    },
    {
      name: 'VIP',
      price: '₦20,000',
      duration: 'per month',
      icon: '/svg/vip.svg',
      details:
        'Upload up to 5 products. You also pay a 2% commission on each product sold.',
      isActive: false,
      isComing: true,
    },
  ];
  return (
    <div className='mt-4'>
      <AppHeader noSVG />
      <div className='mt-3'>
        <h2 className='text-3xl font-light my-2'>Subscription</h2>
        <div className='mt-2 mb-14'>
          <Infocard
            text={
              'You are still on the free plan that allows you upload up to 5 products. You also pay a 7% commision on each product sold on the free plan.'
            }
            icon={'/svg/info.svg'}
            style={'bg-app-cream mb-10'}
          />
          <div>
            {plans.map((plan, index) => (
              <SubscriptionTab
                key={index}
                subscription={plan}
                setSubscriptionStep={setSubscriptionStep}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
