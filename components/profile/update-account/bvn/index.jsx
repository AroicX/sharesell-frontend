import React from 'react';
import AppHeader from '@/components/AppHeader';
import Infocard from '@/reusable/Infocard';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';

export default function BVN({next}) {
  return (
    <div className='mt-4'>
      <AppHeader noSVG />
      <div>
        <h2 className='text-3xl font-light my-4'>BVN</h2>
        <div>
          <Infocard
            icon={'/svg/info.svg'}
            text={
              'We use your BVN to ensure the account you are about to create belongs to you. Your BVN doesn’t grant us access to your bank accounts.'
            }
            style={'bg-app-cream'}
          />
        </div>
        <div className='my-7'>
          <Input label={'BVN'} placeholder={'Enter BVN'} />
        </div>
        <Button text={'Verify BVN'} iconRight={'/svg/arrow-right.svg'} click={next}/>
      </div>
    </div>
  );
}
