import React from 'react';
import AppHeader from 'components/AppHeader';
import MoreContainer from '@/components/MoreContainer';

export default function PickUpAddress({ setCurrentState }) {
  const SavedAddress = [
    { address: 'No.3 Maha Close', city: 'Barnawa', state: 'Kaduna' },
    { address: 'No.3 Maha Closer', city: 'Barnawa', state: 'Kaduna' },
  ];

  return (
    <div className='mt-3'>
      <AppHeader noSVG />
      <div className=''>
        <h2 className='text-3xl font-light my-4'>Saved Pickup Addresses</h2>
        <div className=''>
          <p className='text-sm'>Saved Pickup Addresses</p>
          <div>
            {SavedAddress.map((address, index) => (
              <div
                key={index}
                className='flex justify-between min-h-fit bg-app-cream rounded border p-4 py-6 border-lightest-color mt-4 relative'
              >
                <p className='w-48 text-sm'>{`${address.address}, ${address.city} ${address.state}, Nigeria`}</p>
                <MoreContainer
                  savedAddress={SavedAddress[index]}
                  setCurrentState={setCurrentState}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
