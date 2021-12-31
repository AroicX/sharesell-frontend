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
  const [form, setForm] = useState({
    oldPassword: '',
    oldPasswordError: '',
    newPassword: '',
    newPasswordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useGlobalStore();

  const onSubmitHandler = () => {
    if (
      inputValidatorChecker(form.oldPassword) &&
      inputValidatorChecker(form.newPassword) &&
      inputValidatorChecker(form.confirmPassword) &&
      form.newPassword === form.confirmPassword
    ) {
      setIsLoading(true);
      const data = {
        old_password: form.oldPassword,
        new_password: form.newPassword,
        confirm_password: form.confirmPassword,
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
        form.oldPassword,
        setForm,
        'oldPasswordError',
        'Old Password is Required'
      );
      inputValidatorErrorState(
        form.newPassword,
        setForm,
        'newPasswordError',
        'New Password is required'
      );
      inputValidatorErrorState(
        form.confirmPassword,
        setForm,
        'confirmPasswordError',
        'Confirm Password is required'
      );
      if (form.newPassword !== form.confirmPassword) {
        setForm((prev) => {
          return {
            ...prev,
            confirmPasswordError:
              'Confirm Password must match with the New Password Field',
          };
        });
      }
    }
  };

  const onChangeHandler = (data, fieldState, fieldErrorState) => {
    setForm((prev) => {
      return { ...prev, [fieldState]: data, [fieldErrorState]: '' };
    });
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
              value={form.oldPassword}
              dispatch={(data) =>
                onChangeHandler(data, 'oldPassword', 'oldPasswordError')
              }
              error={form.oldPasswordError}
            />
          </div>
          <div className='mb-8'>
            <Input
              type='password'
              label={'New Password'}
              placeholder={'New Password'}
              value={form.newPassword}
              dispatch={(data) =>
                onChangeHandler(data, 'newPassword', 'newPasswordError')
              }
              error={form.newPasswordError}
            />
          </div>
          <div className='mb-8'>
            <Input
              type='password'
              label={'Retype New Password'}
              placeholder={'Retype Password'}
              value={form.confirmPassword}
              dispatch={(data) =>
                onChangeHandler(data, 'confirmPassword', 'confirmPasswordError')
              }
              error={form.confirmPasswordError}
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
