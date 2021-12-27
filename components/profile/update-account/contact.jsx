import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import Select from '@/reusable/Select';
import { useRouter } from 'next/router';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { ResponseHandler } from '@/helpers/index';
import { CONTACT_PERSON } from '@/services/profile/update-account/index';

export default function Contact() {
  const [gender, setGender] = useState('');
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
    };

    const callback = (response) => {
      if (response) {
        setIsLoading(false);
        ResponseHandler(response);
        Router.back();
      }
    };

    const onError = (err) => {
      setIsLoading(false);
      console.log(err);
    };

    CONTACT_PERSON(data, callback, onError);
  };
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
            options={[{ name: 'Female' }, { name: 'Male' }]}
            placeholder={'Select Gender'}
            dispatch={(data) => setGender(data)}
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
