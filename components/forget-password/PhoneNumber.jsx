import React, { useState } from 'react';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import AppHeader from '@/components/AppHeader';
import Link from '@/components/Link';
import {
  inputValidatorChecker,
  inputValidatorErrorState,
  ResponseHandler,
  numberFormatter,
} from '@/helpers/index';
import { PHONE_NUMBER } from '@/services/authentication/index';

export default function PhoneNumber({ next, user, setUser }) {
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
        phone: user.phoneNumber,
      };

      const callback = (response) => {
        setIsLoading(false);
        console.log(response);
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
        // next();
      };

      const onError = (err) => {
        console.log(err);
        setIsLoading(false);
        ResponseHandler(err.data);
      };
      //   PHONE_NUMBER(data, callback, onError);
      next();
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
      <AppHeader />
      <div className='phone-number mt-20'>
        <h2 className='text-3xl font-light my-2'>Phone Number</h2>
        <span className='text-app-text'>
          Fill in your Phone Number, below let's help you out!
        </span>
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
            styles={'p-5 block bg-app-color'}
            text='Proceed'
            iconRight={'/svg/arrow-right.svg'}
            click={() => onSubmit()}
            loading={isLoading}
          />
          <div className='flex justify-center items-center'>
            <span className='w-full p-2 text-sm center justify-center text-center mt-32 font-medium'>
              Return Back to
              <Link className='mx-2 underline text-app-color' to='/login'>
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
