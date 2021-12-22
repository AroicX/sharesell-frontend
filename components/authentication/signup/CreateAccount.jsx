import React from 'react';

import Input from 'reusable/Input';
import Button from 'reusable/Button';
import AppHeader from 'components/AppHeader';

export default function CreateAccount({ back }) {
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
            />
          </div>
          <div className='my-8'>
            <Input
              label={'Create Password'}
              type='password'
              placeholder={'Enter Password'}
            />
          </div>
          <div className='my-8'>
            <Input
              label={'Retype Password'}
              type='password'
              placeholder={'Retype Password'}
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
          />
        </div>
      </div>
    </div>
  );
}
