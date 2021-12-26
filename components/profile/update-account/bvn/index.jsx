import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Infocard from '@/reusable/Infocard';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { UPDATE_BVN } from '@/services/profile/update-account';
import { ResponseHandler } from '@/helpers/index';

export default function BVN({ next }) {
  const [bvn, setBvn] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useGlobalStore;
  const onSubmitHandler = () => {
    setIsLoading(true);
    const data = {
      user_id: user ? user.user_id : '',
      bvn: bvn,
    };

    const callBack = (response) => {
      if (response) {
        setIsLoading(false);
        console.log(response)
        ResponseHandler(response);
        next();
      }
    };

    const onError = (err) => {
      setIsLoading(false);
      console.log(err);
    };

    UPDATE_BVN(data, callBack, onError);
  };
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
            dispatch={(data) => setBvn(data)}
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
