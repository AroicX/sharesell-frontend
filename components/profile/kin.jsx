import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import { useRouter } from 'next/router';
import Select from '@/reusable/Select';

export default function Kin() {
  const [gender, setGender] = useState('');
  const [relationship, setRelationship] = useState('');
  const Router = useRouter();
  return (
    <div className='mt-4'>
      <AppHeader noSVG />
      <div>
        <h2 className='text-3xl font-light my-2'>Next of Kin</h2>
        <span className='text-app-text'>Please provide accurate details.</span>
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
          <Select
            label={'Relationship'}
            options={['Brother', 'Sister', 'Wife', 'Husband']}
            placeholder={'Select Relationship'}
            dispatch={(data) => setRelationship(data)}
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
