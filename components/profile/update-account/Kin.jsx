import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import { useRouter } from 'next/router';
import Select from '@/reusable/Select';
import { ResponseHandler } from '@/helpers/index';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { NEXT_OF_Kin } from '@/services/profile/update-account';

export default function Kin() {
  const [gender, setGender] = useState('');
  const [relationship, setRelationship] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const { user } = useGlobalStore();

  const onSubmitHandler = () => {
    setIsLoading(true);
    const data = {
      user_id: user ? user.user_id : '',
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      email: email,
      phone_number: phoneNumber,
      relationship: relationship,
    };

    const callback = (response) => {
      if (response) {
        setIsLoading(false);
        ResponseHandler(response);
        Router.back();
      }
    };

    const onError = (err) => {
      console.log(err);
      setIsLoading(false);
    };

    NEXT_OF_Kin(data, callback, onError);
  };
  return (
    <div className='mt-4'>
      <AppHeader noSVG />
      <div>
        <h2 className='text-3xl font-light my-2'>Next of Kin</h2>
        <span className='text-app-text'>Please provide accurate details.</span>
        <div>
          <div className='mt-7'>
            <Input
              label={'First Name'}
              placeholder={'Chike'}
              value={firstName}
              dispatch={(data) => setFirstName(data)}
            />
          </div>
          <div className='mt-7'>
            <Input
              label={'Last Name'}
              placeholder={'Pascal'}
              value={lastName}
              dispatch={(data) => setLastName(data)}
            />
          </div>
          <Select
            label={'Gender'}
            options={[{ name: 'Male' }, { name: 'Female' }]}
            placeholder={'Select Gender'}
            dispatch={(data) => setGender(data)}
          />
          <Select
            label={'Relationship'}
            options={[
              { name: 'Son' },
              { name: 'Brother' },
              { name: 'Daughter' },
              { name: 'Sister' },
              { name: 'Husband' },
              { name: 'Wife' },
              { name: 'Father' },
              { name: 'Mother' },
            ]}
            placeholder={'Select Relationship'}
            dispatch={(data) => setRelationship(data)}
          />
          <div className='mt-7'>
            <Input
              label={'Email'}
              placeholder={'Enter Email'}
              type='Email'
              value={email}
              dispatch={(data) => setEmail(data)}
            />
          </div>
          <div className='my-7'>
            <Input
              label={'Phone Number'}
              placeholder={'Enter Phone Number'}
              value={phoneNumber}
              dispatch={(data) => setPhoneNumber(data)}
            />
          </div>
          <Button
            text={'Submit'}
            iconRight={'/svg/arrow-right.svg'}
            click={onSubmitHandler}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
