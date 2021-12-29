import React, { useState } from 'react';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import AppHeader from '@/components/AppHeader';
import {
  inputValidatorChecker,
  inputValidatorErrorState,
} from '@/helpers/index';

export default function BusinessRegistration({ next, back, user, setUser }) {
  const [businessNameError, setBusinessNameError] = useState('');
  const [isRegisteredError, setIsRegistedredError] = useState('');
  const [bvnError, setBvnError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isRegisteredOnChangeHandler = (value) => {
    setUser((prev) => {
      return { ...prev, isRegistered: value };
    });
    setBvnError('');
  };

  const businessNameOnChangeHandler = (data) => {
    setUser((prev) => {
      return { ...prev, businessName: data };
    });
    setBusinessNameError('');
  };

  const rcNumberOnChangeHandler = (data) => {
    setUser((prev) => {
      return { ...prev, bvn_number: data };
    });
    setBvnError('');
  };

  const onSubmitHandler = () => {
    if (
      inputValidatorChecker(user.businessName) &&
      ((user.isRegistered === true && inputValidatorChecker(user.bvn_number)) ||
        user.isRegistered === false)
    ) {
      next();
    } else {
      inputValidatorErrorState(
        user.businessName,
        setBusinessNameError,
        'Business Name is Required'
      );
      if (
        user.isRegistered === true &&
        !inputValidatorChecker(user.bvn_number)
      ) {
        inputValidatorErrorState(
          user.bvn_number,
          setBvnError,
          'Your RC/BN is required for a registered Business'
        );
      }
    }
  };
  return (
    <div className='Business-Auth'>
      <AppHeader click={back} />
      <div className='business'>
        <h2 className='text-3xl font-light my-2'>Business Name</h2>
        <span className='text-app-text'>Enter your business name.</span>
        <div className='business-name mt-4'>
          <Input
            label={'Business Name'}
            type='text'
            placeholder={'Chika Inc'}
            value={user.businessName}
            dispatch={(data) => businessNameOnChangeHandler(data)}
            error={businessNameError}
          />
          <div className='flex flex-col mb-2'>
            <p className='text-app-text text-base mb-2'>
              Is your busines registered?
            </p>
            <div className='flex items-center'>
              <div className='flex items-center'>
                <label className='text-app-text text-base'>Yes</label>
                <input
                  type='radio'
                  name='business-reg'
                  onClick={() => isRegisteredOnChangeHandler(true)}
                  checked={user.isRegistered}
                  className='mx-4'
                  readOnly
                />
              </div>
              <div className='flex items-center'>
                <label className='text-app-text text-base'>No</label>
                <input
                  type='radio'
                  name='business-reg'
                  onClick={() => isRegisteredOnChangeHandler(false)}
                  checked={!user.isRegistered}
                  className='mx-4'
                  readOnly
                />
              </div>
            </div>
          </div>
          {user.isRegistered && (
            <Input
              label={'RC / BN Number'}
              type='text'
              placeholder={'Enter RC / BN Number'}
              value={user.bvn_number}
              dispatch={(data) => rcNumberOnChangeHandler(data)}
              error={bvnError}
            />
          )}
          <Button
            styles={'p-5 block '}
            text='Submit'
            iconRight={'/svg/arrow-right.svg'}
            click={onSubmitHandler}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
