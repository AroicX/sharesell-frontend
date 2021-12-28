import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from 'reusable/Input';
import Button from 'reusable/Button';
import { useRouter } from 'next/router';
import {
  ResponseHandler,
  inputValidatorErrorState,
  inputValidatorChecker,
} from '@/helpers/index';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { CHANGE_PASSWORD } from '@/services/profile';

export default function ChangePassword() {
  const Router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useGlobalStore();

  const onSubmitHandler = () => {
    if (
      inputValidatorChecker(oldPassword) &&
      inputValidatorChecker(newPassword) &&
      inputValidatorChecker(confirmPassword) &&
      newPassword === confirmPassword
    ) {
      setIsLoading(true);
      const data = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };
      const callback = (response) => {
        if (response) {
          setIsLoading(false);
          ResponseHandler(response);
          Router.push('/profile');
        }
      };

      const onError = (err) => {
        setIsLoading(false);
        console.log(err);
      };

      CHANGE_PASSWORD(data, callback, onError);
    } else {
      inputValidatorErrorState(
        oldPassword,
        setOldPasswordError,
        'Old Password is Required'
      );
      inputValidatorErrorState(
        newPassword,
        setNewPasswordError,
        'New Password is required'
      );
      inputValidatorErrorState(
        confirmPassword,
        setConfirmPasswordError,
        'Confirm Password is required'
      );
      if (newPassword !== confirmPassword) {
        setConfirmPasswordError(
          'Confirm Password must match with the New Password Field'
        );
      }
    }
  };

  const oldPasswordOnChangeHandler = (data) => {
    setOldPassword(data);
    setOldPasswordError('');
  };

  const newPasswordOnChangeHandler = (data) => {
    setNewPassword(data);
    setNewPasswordError("");
  };

  const confirmPasswordOnChangeHandler = (data) => {
    setConfirmPassword(data);
    setConfirmPasswordError('');
  };
  return (
    <div className='mt-4'>
      <AppHeader noSVG />
      <div className=''>
        <h2 className='text-3xl font-light my-4'>Change Password</h2>
        <div className='mt-10'>
          <div className='mb-8'>
            <Input
              type='password'
              label={'Current Password'}
              placeholder={'Current Password'}
              value={oldPassword}
              dispatch={(data) => oldPasswordOnChangeHandler(data)}
              error={oldPasswordError}
            />
          </div>
          <div className='mb-8'>
            <Input
              type='password'
              label={'New Password'}
              placeholder={'New Password'}
              value={newPassword}
              dispatch={(data) => newPasswordOnChangeHandler(data)}
              error={newPasswordError}
            />
          </div>
          <div className='mb-8'>
            <Input
              type='password'
              label={'Retype New Password'}
              placeholder={'Retype Password'}
              value={confirmPassword}
              dispatch={(data) => confirmPasswordOnChangeHandler(data)}
              error={confirmPasswordError}
            />
          </div>
          <Button
            text={'Save Changes'}
            iconRight={'/svg/arrow-right.svg'}
            click={onSubmitHandler}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
