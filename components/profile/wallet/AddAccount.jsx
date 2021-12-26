import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Select from '@/reusable/Select';
import Button from '@/reusable/Button';

export default function AddAccount({ next, back }) {
  const [bankName, setBankName] = useState('');
  return (
    <div className='mt-4'>
      <AppHeader noSVG click={back} />
      <div>
        <h2 className='text-2xl font-medium text-pry-black my-4'>
          Add a bank account
        </h2>
        <div>
          <div className='mt-8'>
            <Select
              placeholder={'Select a Bank Account'}
              label={'Bank Name'}
              options={['Access', 'First Bank', 'GTB', 'KUDA']}
              dispatch={(value) => setBankName(value)}
            />
          </div>
          <div className='mt-8 mb-5'>
            <Input placeholder={'0111555814'} label={'Account Number'} />
          </div>
          <Button
            text={'Save'}
            iconRight={'/svg/arrow-right.svg'}
            click={next}
          />
        </div>
      </div>
    </div>
  );
}
