import React, { useState, useEffect } from 'react';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import AppHeader from '@/components/AppHeader';
import {
  ResponseHandler,
  numberFormatter,
  inputValidatorChecker,
  inputValidatorErrorState,
} from '@/helpers/index';
import { ONE_TIME_PASSWORD } from '@/services/authentication/index';

export default function OneTimePassword({ next, back, user }) {
  const [form, setForm] = useState({ otp: '', otpError: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [totalTime, setTotalTime] = useState(300);
  useEffect(() => {
    let timer = setInterval(function () {
      totalTime > 0 && setTotalTime(totalTime - 1, 1000);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [totalTime]);

  const otpOnChangeHandler = (data) => {
    setForm((prev) => {
      return { ...prev, otp: numberFormatter(data), otpError: '' };
    });
  };

  const onSubmitHandler = () => {
    if (inputValidatorChecker(form.otp)) {
      const data = {
        otp: form.otp,
      };
      setIsLoading(true);
      const callback = (response) => {
        setIsLoading(false);
        ResponseHandler(response);
        next();
      };

      const onError = (err) => {
        console.log(err);
        ResponseHandler(err.data);
        setIsLoading(false);
        if (err.status === 403) {
          setTotalTime(0);
        }
      };

      ONE_TIME_PASSWORD(data, callback, onError);
    } else {
      inputValidatorErrorState(
        form.otp,
        setForm,
        'otpError',
        'One Time Password is Required'
      );
    }
  };
  return (
    <div className='phoneVerification'>
      <AppHeader click={back} />
      <div className='verification mt-20'>
        <h2 className='text-3xl font-light my-2'>Verification</h2>
        <span className='text-app-text'>
          Enter the OTP sent to your phone number
        </span>
        <div className='flex flex-col mt-2'>
          <Input
            label={'OTP'}
            type='text'
            placeholder={'Enter OTP'}
            value={form.otp}
            dispatch={(data) => otpOnChangeHandler(data)}
            error={form.otpError}
          />
          <Button
            styles={'p-5 block bg-app-color'}
            text='Verify'
            iconRight={'/svg/arrow-right.svg'}
            click={onSubmitHandler}
            loading={isLoading}
          />
        </div>
        <div className='mt-32 flex flex-col justify-center items-center'>
          {totalTime === 0 ? (
            <p className='underline font-medium text-app-text cursor-pointer'>
              Click to Resend OTP
            </p>
          ) : (
            <h4 className='font-bold text-app-text text-base'>
              <span>{Math.floor(totalTime / 60)}</span>:
              <span>
                {Math.floor(totalTime % 60) < 10
                  ? `0${Math.floor(totalTime % 60)}`
                  : Math.floor(totalTime % 60)}
              </span>
            </h4>
          )}
          <span className='w-full p-2 text-center text-sm'>
            {`${user.phoneNumber}`} |
            <a className='mx-2 underline font-medium' href='#'>
              Change Phone Number
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
