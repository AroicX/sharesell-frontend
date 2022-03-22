import React, { useState } from 'react';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import AppHeader from '@/components/AppHeader';
import Link from '@/components/Link';
import {
  inputValidatorChecker,
  inputValidatorErrorState,
  ResponseHandler,
} from '@/helpers/index';
import { useRouter } from 'next/router';
import { QUICK_REGISTER } from '@/services/authentication';

export default function CreateAccount({ back }) {
  const [form, setForm] = useState({
    otp: '',
    otpError: '',
    password: '',
    passwordError: '',
    reEnterPassword: '',
    reEnterPasswordError: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();
  const onChangeHandler = (data, field, fieldError) => {
    setForm((prev) => {
      return { ...prev, [fieldError]: '', [field]: data };
    });
  };

  const onSubmitHandler = () => {
    if (
      inputValidatorChecker(form.password) &&
      inputValidatorChecker(form.reEnterPassword) &&
      inputValidatorChecker(form.otp) &&
      form.password === form.reEnterPassword
    ) {
      setIsLoading(true);
      const data = {
        otp: form.otp,
        password: form.password,
        re_password: form.reEnterPassword,
      };
      const callback = (response) => {
        setIsLoading(false);
        ResponseHandler(response);
        Router.push('/login');
      };

      const onError = (err) => {
        setIsLoading(false);
        console.log(err);
      };

      //   QUICK_REGISTER(data, callback, onError);
    } else {
      inputValidatorErrorState(
        form.password,
        setForm,
        'passwordError',
        'Password is required'
      );
      inputValidatorErrorState(
        form.reEnterPassword,
        setForm,
        'reEnterPasswordError',
        'Retype Password is required'
      );
      inputValidatorErrorState(
        form.otp,
        setForm,
        'otpError',
        'OTP is required'
      );
      if (form.password !== form.reEnterPassword) {
        setForm((prev) => {
          return {
            ...prev,
            reEnterPasswordError:
              "'Retype Password field must match password field'",
          };
        });
      }
    }
  };
  return (
    <div className='loginDetails'>
      <AppHeader click={back} />
      <div className='login-details-content mt-20'>
        <h2 className='text-3xl font-light my-2'>Reset Password</h2>
        <span className='text-app-text'>Enter New Password And OTP</span>
        <div className='login-details'>
          <div className='my-8'>
            <Input
              label={'Enter OTP'}
              type='number'
              placeholder={'Enter OTP'}
              value={form.otp}
              error={form.otpError}
              dispatch={(data) => onChangeHandler(data, 'otp', 'otpError')}
            />
          </div>
          <div className='my-8'>
            <Input
              label={'Create Password'}
              type='password'
              placeholder={'Enter Password'}
              value={form.password}
              error={form.passwordError}
              dispatch={(data) =>
                onChangeHandler(data, 'password', 'passwordError')
              }
            />
          </div>
          <div className='my-8'>
            <Input
              label={'Retype Password'}
              type='password'
              placeholder={'Retype Password'}
              value={form.reEnterPassword}
              dispatch={(data) =>
                onChangeHandler(data, 'reEnterPassword', 'reEnterPasswordError')
              }
              error={form.reEnterPasswordError}
            />
          </div>
          <Button
            styles={'p-5 block bg-app-color'}
            text='Save'
            iconRight={'/svg/arrow-right.svg'}
            loading={isLoading}
            click={onSubmitHandler}
          />
        </div>
        <div className='flex justify-center items-center'>
          <span className='w-full p-2 text-sm center justify-center text-center mt-20 font-medium'>
            Return Back to
            <Link className='mx-2 underline text-app-color' to='/login'>
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
