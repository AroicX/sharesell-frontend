import React, { useState, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import Infocard from '@/reusable/Infocard';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { UPDATE_BVN } from '@/services/profile/update-account';
import { ResponseHandler } from '@/helpers/index';
import { useRouter } from 'next/router';

export default function BVN({ next }) {
  const { user, userProfile } = useGlobalStore();
  const [bvn, setBvn] = useState(userProfile ? userProfile.bvn : '');
  const [bvnError, setBvnError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const onSubmitHandler = () => {
    if (bvn === '' || bvn.length !== 11) {
      if (bvn === '') {
        setBvnError('BVN is required');
      } else {
        setBvnError('BVN must be 11 digit');
      }
    } else {
      setIsLoading(true);
      const data = {
        user_id: user ? user.user_id : '',
        bvn: bvn,
      };

      const callBack = (response) => {
        if (response) {
          setIsLoading(false);
          ResponseHandler(response);
          next();
        }
      };

      const onError = (err) => {
        setIsLoading(false);
        console.log(err);
      };

      UPDATE_BVN(data, callBack, onError);
    }
  };

  const bvnOnChangeHandler = (data) => {
    setBvn(data);
    setBvnError('');
  };

  useEffect(() => {
    if (!userProfile) {
      Router.push('/profile/update-account');
    }
  }, [userProfile]);
  return (
    <div className='mt-4'>
      <AppHeader noSVG />
      <div>
        <h2 className='text-3xl font-light my-4'>BVN</h2>
        <div>
          <Infocard
            icon={'/svg/info.svg'}
            text={
              'We use your BVN to ensure the account you are about to create belongs to you. Your BVN doesn’t grant us access to your bank accounts.'
            }
            style={'bg-app-cream'}
          />
        </div>
        <div className='my-7'>
          <Input
            label={'BVN'}
            placeholder={'Enter BVN'}
            value={bvn}
            dispatch={(data) => bvnOnChangeHandler(data)}
            error={bvnError}
          />
        </div>
        <Button
          text={'Verify BVN'}
          iconRight={'/svg/arrow-right.svg'}
          click={onSubmitHandler}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
