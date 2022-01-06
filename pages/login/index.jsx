import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Button from '@/reusable/Button';
import Input from '@/reusable/Input';
import { LOGIN_ACCOUNT } from '@/services/authentication';
import { ResponseHandler } from 'helpers';
import Link from '@/components/Link';
import { setCookie } from '@/services/cookies';
import router from 'next/router';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import useGuest from '@/hooks/useGuest';

function Login() {
  const { setToken } = useGlobalStore();
  const [data, setData] = useState({
    email: 'reseller@sharesell.com',
    password: 'password',
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const callback = (response) => {
      if (response.status === 'success') {
        setCookie(response.token);
        window.localStorage.setItem('user-data', JSON.stringify(response));
        setLoading(false);
        setToken(response.token);
        let _redirect = window.localStorage.getItem('be-authorized');
        _redirect ? router.push(_redirect) : router.push('/dashboard');
      } else {
        ResponseHandler(response);
        setLoading(false);
      }
    };
    const onError = (errors) => {
      console.log(errors);
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
            required
          />
          <Input
            label={'Password'}
            type='password'
            value={data.password}
            placeholder={'chikainc@gmail.com'}
            dispatch={(value) => setData({ ...data, password: value })}
            required
          />

          <Button
            styles={'p-5 block bg-app-color'}
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

export default useGuest(Login);
