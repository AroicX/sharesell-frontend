import React, { useState } from 'react';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import AppHeader from '@/components/AppHeader';
import {
  inputValidatorChecker,
  inputValidatorErrorState,
} from '@/helpers/index';

export default function BusinessRegistration({ next, back, user, setUser }) {
  const [form, setForm] = useState({ businessNameError: '', bvnError: '' });
  const [isLoading, setIsLoading] = useState(false);

  let isSupplier = user.userType === 3 ? true : false;
  const isRegisteredOnChangeHandler = (value) => {
    setUser((prev) => {
      return { ...prev, isRegistered: value };
    });
    setForm((prev) => {
      return { ...prev, bvnError: '' };
    });
  };

  const businessNameOnChangeHandler = (data) => {
    setUser((prev) => {
      return { ...prev, businessName: data };
    });
    setForm((prev) => {
      return { ...prev, businessNameError: '' };
    });
  };

  const rcNumberOnChangeHandler = (data) => {
    setUser((prev) => {
      return { ...prev, bvn_number: data };
    });
    setForm((prev) => {
      return { ...prev, bvnError: '' };
    });
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
        setForm,
        'businessNameError',
        'Business Name is Required'
      );
      if (
        user.isRegistered === true &&
        !inputValidatorChecker(user.bvn_number)
      ) {
        inputValidatorErrorState(
          user.bvn_number,
          setForm,
          'bvnError',
          'Your RC/BN is required for a registered Business'
        );
      }
    }
  };
  return (
    <div className='Business-Auth'>
      <AppHeader click={back} />
      <div className='business mt-20'>
        <h2 className='text-3xl font-light my-2'>{`${
          isSupplier ? 'Business Name' : 'Fullname'
        }`}</h2>
        <span className='text-app-text'>{`${
          isSupplier ? 'Enter your business name.' : 'Enter Fullname'
        }`}</span>
        <div className='business-name mt-4'>
          <Input
            label={`${isSupplier ? 'Business Name' : 'Fullname'}`}
            type='text'
            placeholder={'Chika Inc'}
            value={user.businessName ? user.businessName : ''}
            dispatch={(data) => businessNameOnChangeHandler(data)}
            error={form.businessNameError}
          />
          {isSupplier ? (
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
          ) : (
            ''
          )}
          {user.isRegistered && (
            <Input
              label={'RC / BN Number'}
              type='text'
              placeholder={'Enter RC / BN Number'}
              value={user.bvn_number ? user.bvn_number : ''}
              dispatch={(data) => rcNumberOnChangeHandler(data)}
              error={form.bvnError}
            />
          )}
          <Button
            styles={'p-5 block bg-app-color '}
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
