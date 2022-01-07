import React from 'react';
import AppHeader from '@/components/AppHeader';
import NotificationTab from '../NotificationTab';

export default function Notifications({ setCurrentStep }) {
  const notifications = [
    {
      title: 'Transaction Notification',
      time: 'Time: 2:20pm, August 12 2020',
      content:
        'The sum of ₦200,000 was transfered to your GTBank Plc account. The sum of ₦200,000 was transfered to your GTBank Plc account.',
      read: false,
    },
    {
      title: 'Transaction Notification',
      time: 'Time: 2:20pm, August 12 2020',
      content:
        'The sum of ₦200,000 was transfered to your GTBank Plc account. The sum of ₦200,000 was transfered to your GTBank Plc account.',
      read: true,
    },
    {
      title: 'Update your account',
      time: 'Time: 1:20pm, August 10 2020',
      content:
        'Hey there, Kindly update your account to gain full access to ShareSell \b Tap the button to update.',
      read: false,
    },
    {
      title: 'Welcome Message',
      time: 'Time: 1:20pm, August 10 2020',
      content:
        'Hey there, Kindly update your account to gain full access to ShareSell',
      read: false,
    },
  ];
  return (
    <div className='mt-4 px-3'>
      <AppHeader noSVG styles='py-5' />
      <div className='mt-20'>
        <h2 className='font-medium text-2xl text-pry-black mt-4 mb-6'>
          Notifications
        </h2>
        <div>
          {notifications.map((notification, index) => (
            <NotificationTab
              key={index}
              notification={notification}
              setCurrentStep={setCurrentStep}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
