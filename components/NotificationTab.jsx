import React from 'react';

export default function NotificationTab({ notification, setCurrentStep }) {
  const showNotification = () => {
    setCurrentStep((prev) => {
      return { ...prev, step: 2 };
    });
  };
  return (
    <div
      className='pb-3 border-b border-border-color mb-4 cursor-pointer'
      onClick={() => showNotification()}
    >
      <div className='flex justify-between items-center'>
        <p
          className={`font-medium text-base ${
            notification.read ? 'text-app-color' : 'text-app-text'
          }`}
        >
          {notification.title}
        </p>
        {notification.read === false && (
          <div className='w-2 h-2 rounded-full bg-terms'></div>
        )}
      </div>
      <p className='text-dark-grey text-xs my-3'>{notification.time}</p>
      <p className='text-app-color text-base overflow-hidden truncate w-80 notification-content'>
        {notification.content}
      </p>
    </div>
  );
}
