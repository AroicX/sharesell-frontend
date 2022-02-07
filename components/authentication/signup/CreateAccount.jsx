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
  const [form, setForm] = useState({
    emailError: '',
    passwordError: '',
    reEnterPasswordError: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();
  const onChangeHandler = (data, field, fieldError) => {
    setUser((prev) => {
      return { ...prev, [field]: data };
    });
    setForm((prev) => {
      return { ...prev, [fieldError]: '' };
    });
  };

  const onSubmitHandler = () => {
    if (
      inputValidatorChecker(user.password) &&
      inputValidatorChecker(user.reEnterPassword) &&
      emailValidatorChecker(user.email) &&
      user.password === user.reEnterPassword
    ) {
      setIsLoading(true);
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
        // Router.push('/dashboard');
      };

      const onError = (err) => {
        setIsLoading(false);
        console.log(err);
      };

      QUICK_REGISTER(data, callback, onError);
    } else {
      inputValidatorErrorState(
        user.password,
        setForm,
        'passwordError',
        'Password is required'
      );
      inputValidatorErrorState(
        user.reEnterPassword,
        setForm,
        'reEnterPasswordError',
        'Retype Password is required'
      );
      emailValidatorError(user.email, setForm);
      if (user.password !== user.reEnterPassword) {
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
              error={form.emailError}
              dispatch={(data) => onChangeHandler(data, 'email', 'emailError')}
            />
          </div>
          <div className='my-8'>
            <Input
              label={'Create Password'}
              type='password'
              placeholder={'Enter Password'}
              value={user.password}
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
              value={user.reEnterPassword}
              dispatch={(data) =>
                onChangeHandler(data, 'reEnterPassword', 'reEnterPasswordError')
              }
              error={form.reEnterPasswordError}
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
            styles={'p-5 block bg-app-color'}
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
