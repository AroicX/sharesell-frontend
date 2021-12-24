import React, { useState } from 'react';
import AppHeader from '@/components/appHeader';
import Button from '@/reusable/Button';
import Input from '@/reusable/Input';
import { LOGIN_ACCOUNT } from '@/services/authentication';
import { ResponseHandler } from 'helpers';
import Link from '@/components/link';
import { setCookie } from '@/services/cookies';
import router from 'next/router';

export default function Login() {
  const [data, setData] = useState({
    email: 'supplier@sharesell.com',
    password: 'password',
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const callback = (response) => {
      ResponseHandler(response);

      setCookie(response.token);
      window.localStorage.setItem('user-data', JSON.stringify(response));
      setLoading(false);
      router.push(window.localStorage.getItem('be-authorized'));
    };
    const onError = (response) => {
      console.log(response);
    };

    await LOGIN_ACCOUNT(data, callback, onError);

    return false;
  };

  return (
    <div className='login'>
      <AppHeader />
      <div className='login-content mt-20'>
        <h2 className='text-3xl font-light my-2'>Log into your account</h2>
        <span className='text-app-text'>Welcome back to ShareSell.</span>

        <form className='flex flex-col mt-10' onSubmit={handleSubmit}>
          <Input
            label={'Email'}
            type='email'
            value={data.email}
            placeholder={'chikainc@gmail.com'}
            dispatch={(value) => setData({ ...data, email: value })}
          />
          <Input
            label={'Password'}
            type='password'
            value={data.password}
            placeholder={'chikainc@gmail.com'}
            dispatch={(value) => setData({ ...data, password: value })}
          />

          <Button
            styles={'p-5 block '}
            text='Login'
            iconRight={'/svg/arrow-right.svg'}
            loading={loading}
          />
        </form>

        <span className='w-full p-2 flex center justify-center text-center mt-32'>
          Don’t Have an account?
          <Link className='mx-2 underline' to='/signup'>
            Create Account
          </Link>
        </span>
      </div>
    </div>
  );
}
