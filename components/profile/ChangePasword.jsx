import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from 'reusable/Input';
import Button from 'reusable/Button';
import { useRouter } from 'next/router';
import { ResponseHandler } from '@/helpers/index';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { CHANGE_PASSWORD } from '@/services/profile';

export default function ChangePassword() {
  const Router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useGlobalStore();

  const onSubmitHandler = () => {
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
        Router.back();
      }
    };

    const onError = (err) => {
      console.log(err);
    };

    CHANGE_PASSWORD(data, callback, onError);
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
              dispatch={(data) => setOldPassword(data)}
            />
          </div>
          <div className='mb-8'>
            <Input
              type='password'
              label={'New Password'}
              placeholder={'New Password'}
              value={newPassword}
              dispatch={(data) => setNewPassword(data)}
            />
          </div>
          <div className='mb-8'>
            <Input
              type='password'
              label={'Retype New Password'}
              placeholder={'Retype Password'}
              value={confirmPassword}
              dispatch={(data) => setConfirmPassword(data)}
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
