import React, { useState } from 'react';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import AppHeader from '@/components/AppHeader';
import {
  inputValidatorChecker,
  inputValidatorErrorState,
  ResponseHandler,
  numberFormatter,
} from '@/helpers/index';
import { PHONE_NUMBER } from '@/services/authentication/index';

export default function PhoneNumber({ next, back, user, setUser }) {
  const [form, setForm] = useState({ phoneNumberError: '' });
  const [isLoading, setIsLoading] = useState(false);
  const phoneOnChangeHandler = (data) => {
    setUser((prev) => {
      return { ...prev, phoneNumber: numberFormatter(data) };
    });

    setForm((prev) => {
      return { ...prev, phoneNumberError: '' };
    });
  };

  const onSubmit = () => {
    if (inputValidatorChecker(user.phoneNumber)) {
      setIsLoading(true);
      const data = {
        type: user.userType,
        phone: user.phoneNumber,
      };

      const callback = (response) => {
        setIsLoading(false);
        ResponseHandler(response);
        if (response.payload) {
          setUser((prev) => {
            return {
              ...prev,
              userId: response.payload.user_id,
              otp: response.payload.one_time_password,
            };
          });
        }
        next();
      };

      const onError = (err) => {
        console.log(err);
        setIsLoading(false);
      };
      PHONE_NUMBER(data, callback, onError);
    } else {
      inputValidatorErrorState(
        user.phoneNumber,
        setForm,
        'phoneNumberError',
        'Phone Number is required'
      );
    }
  };
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
            value={user.phoneNumber}
            dispatch={(data) => phoneOnChangeHandler(data)}
            error={form.phoneNumberError}
          />
          <Button
            styles={'p-5 block '}
            text='Submit'
            iconRight={'/svg/arrow-right.svg'}
            click={() => onSubmit()}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
