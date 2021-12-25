import React from 'react';
import AppHeader from 'components/AppHeader';
import WithdrawalDisplay from 'components/WithdrawalDisplay';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';

export default function Wallet({ next }) {
  return (
    <div className='mt-4'>
      <AppHeader noSVG />
      <div>
        <h2 className='text-3xl font-light my-2'>Make a Withdrawal</h2>
        <div>
          <WithdrawalDisplay noButton />
          <div className='mt-12'>
            <Input placeholder={'N20,000'} label={'Amount to Withdraw'} />
          </div>
          <p className='ml-auto text-xs text-app-color max-w-max mb-6'>
            Transaction Charge: N100
          </p>
          <Button
            text={'Proceed'}
            iconRight='/svg/arrow-right.svg'
            click={next}
          />
        </div>
      </div>
    </div>
  );
}
