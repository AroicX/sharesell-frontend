import React, { useEffect } from 'react';
import AppHeader from 'components/AppHeader';
import MoreContainer from '@/components/MoreContainer';
import Button from '@/reusable/Button';
import { _protectedRequest } from '@/services/index';
import useSWR from 'swr';
import { useState } from 'react/cjs/react.development';

export default function PickUpAddress({ setCurrentState }) {
  const [savedAddress, setSavedAddress] = useState([]);
  const { data, error } = useSWR(`/user/address`, _protectedRequest);
  useEffect(() => {
    if (data) {
      setSavedAddress(data.payload);
    }
  }, [data]);
  return (
    <div className='mt-3 mb-28'>
      <AppHeader noSVG styles='py-5' />
      <div className='relative mt-14'>
        <h2 className='text-3xl font-light my-4'>Saved Pickup Addresses</h2>
        <div className=''>
          <p className='text-sm'>Saved Pickup Addresses</p>
          <div>
            {savedAddress?.map((address, index) => (
              <div
                key={index}
                className='flex justify-between min-h-fit bg-app-cream rounded border p-4 py-6 border-lightest-color mt-4 relative'
              >
                <p className='w-48 text-sm'>{`${address?.address}, ${address?.city} ${address?.state}, Nigeria`}</p>
                <MoreContainer
                  savedAddress={savedAddress[index]}
                  setCurrentState={setCurrentState}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='w-54 fixed bottom-10 right-2 '>
          <Button
            iconLeft='/svg/plus-icon.svg'
            text='Create Address'
            styles='block bg-black rounded-full z-50'
            style={{ background: '#000 !important' }}
            click={() => setCurrentState({ currentState: 3 })}
          />
        </div>
      </div>
    </div>
  );
}
