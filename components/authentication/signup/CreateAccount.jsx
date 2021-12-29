import React, { useState } from 'react';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import AppHeader from '@/components/AppHeader';
import {
  emailValidatorChecker,
  emailValidatorError,
  inputValidatorChecker,
  inputValidatorErrorState,
  ResponseHandler,
} from '@/helpers/index';
import { useRouter } from 'next/router';
import { QUICK_REGISTER } from '@/services/authentication';

export default function CreateAccount({ back, user, setUser }) {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [reEnterPasswordError, setReEnterpasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();
  const emailOnChangeHandler = (data) => {
    setUser((prev) => {
      return { ...prev, email: data };
    });
    setEmailError('');
  };

  const passwordOnChangeHandler = (data) => {
    setUser((prev) => {
      return { ...prev, password: data };
    });
    setPasswordError('');
  };

  const reEnterPasswordHandler = (data) => {
    setUser((prev) => {
      return { ...prev, reEnterPassword: data };
    });
    setReEnterpasswordError('');
  };

  const onSubmitHandler = () => {
    if (
      inputValidatorChecker(user.password) &&
      inputValidatorChecker(user.reEnterPassword) &&
      emailValidatorChecker(user.email) &&
      user.password === user.reEnterPassword
    ) {
      setIsLoading(false);
      const data = {
        user_id: user.userId,
        business_name: user.businessName,
        bvn_number: user.bvn_number,
        email: user.email,
        password: user.password,
        re_password: user.reEnterPassword,
        isRegistered: user.isRegistered,
      };

      const callback = (response) => {
        setIsLoading(false);
        ResponseHandler(response);
        console.log(response);
        Router.push('/dashboard');
      };

      const onError = (err) => {
        setIsLoading(false);
        console.log(err);
      };

      QUICK_REGISTER(data, callback, onError);
    } else {
      inputValidatorErrorState(
        user.password,
        setPasswordError,
        'Password is required'
      );
      inputValidatorErrorState(
        user.reEnterPassword,
        setReEnterpasswordError,
        'Retype Password is required'
      );
      emailValidatorError(user.email, setEmailError);
      if (user.password !== user.reEnterPassword) {
        setReEnterpasswordError(
          'Retype Password field must match password field'
        );
      }
    }
  };
  return (
    <div className='loginDetails'>
      <AppHeader click={back} />
      <div className='login-details-content'>
        <h2 className='text-3xl font-light my-2'>Create Login Details</h2>
        <span className='text-app-text'>
          Final touch on setting up your <br />
          account.
        </span>
        <div className='login-details'>
          <div className='my-8'>
            <Input
              label={'Enter Email'}
              type='email'
              placeholder={'chikainc@gmail.com'}
              value={user.email}
              error={emailError}
              dispatch={(data) => emailOnChangeHandler(data)}
            />
          </div>
          <div className='my-8'>
            <Input
              label={'Create Password'}
              type='password'
              placeholder={'Enter Password'}
              value={user.password}
              error={passwordError}
              dispatch={(data) => passwordOnChangeHandler(data)}
            />
          </div>
          <div className='my-8'>
            <Input
              label={'Retype Password'}
              type='password'
              placeholder={'Retype Password'}
              value={user.reEnterPassword}
              dispatch={(data) => reEnterPasswordHandler(data)}
              error={reEnterPasswordError}
            />
          </div>
          <div className='flex items-center w-full mb-6'>
            <input type='checkbox' className='ml-auto' />
            <span className='text-sm ml-2 '>
              I agree to the{' '}
              <a href='#' className='text-terms'>
                Terms and Conditions
              </a>
            </span>
          </div>
          <Button
            styles={'p-5 block '}
            text='Complete account creation'
            iconRight={'/svg/arrow-right.svg'}
            loading={isLoading}
            click={onSubmitHandler}
          />
        </div>
      </div>
    </div>
  );
}
