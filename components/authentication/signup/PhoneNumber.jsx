import React from 'react';

import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import AppHeader from '@/components/appHeader';

export default function PhoneNumber({ next, back }) {
  return (
    <div className='phone'>
      <AppHeader click={back} />
      <div className='phone-number'>
        <h2 className='text-3xl font-light my-2'>Phone Number</h2>
        <span className='text-app-text'>Let us run a quick verification.</span>
        <div className='flex flex-col mt-2'>
          <Input
            label={'Phone Number'}
            type='text'
            placeholder={'Phone Number'}
          />
          <Button
            styles={'p-5 block '}
            text='Submit'
            iconRight={'/svg/arrow-right.svg'}
            click={next}
          />
        </div>
      </div>
    </div>
  );
}
