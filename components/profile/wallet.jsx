import React from 'react';
import AppHeader from 'components/AppHeader';
import WithdrawalDisplay from 'components/WithdrawalDisplay';

export default function Wallet() {
  return (
    <div className='mt-4'>
      <AppHeader noSVG />
      <div>
        <h2 className='text-3xl font-light my-2'>Make a Withdrawal</h2>
        <WithdrawalDisplay noButton/>
      </div>
    </div>
  );
}
