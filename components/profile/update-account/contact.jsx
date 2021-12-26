import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import Select from '@/reusable/Select';
import { useRouter } from 'next/router';

export default function Contact() {
  const [gender, setGender] = useState('');
  const Router = useRouter();
  return (
    <div className='mt-4'>
      <AppHeader noSVG />
      <div>
        <h2 className='text-3xl font-light my-2'>Contact Person</h2>
        <span className='text-app-text'>
          Kindly provide accurate contact details.
        </span>
        <div>
          <div className='mt-7'>
            <Input label={'First Name'} placeholder={'Chike'} />
          </div>
          <div className='mt-7'>
            <Input label={'Last Name'} placeholder={'Pascal'} />
          </div>
          <Select
            label={'Gender'}
            options={['Male', 'Female']}
            placeholder={'Select Gender'}
            dispatch={(data) => setGender(data)}
          />
          <div className='mt-7'>
            <Input label={'Email'} placeholder={'Enter Email'} type='Email' />
          </div>
          <div className='my-7'>
            <Input label={'Phone Number'} placeholder={'Enter Phone Number'} />
          </div>
          <Button
            text={'Submit'}
            iconRight={'/svg/arrow-right.svg'}
            click={() => Router.back()}
          />
        </div>
      </div>
    </div>
  );
}
