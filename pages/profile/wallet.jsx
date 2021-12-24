import React, { useState } from 'react';
import AuthProvider from 'components/AuthProvider';
import Wallet from 'components/profile/wallet';
import EmptyAccount from '@/components/profile/empty-account';

export default function WalletPage() {
  const [walletStep, setWalletStep] = useState({ step: 1 });
  const back = () => {
    if (walletStep.step > 1) {
      setWalletStep((prev) => {
        return { step: prev.step - 1 };
      });
    }
  };
  const next = () => {
    setWalletStep((prev) => {
      return { step: prev.step + 1 };
    });
  };
  return (
    <AuthProvider>
      {walletStep.step === 1 ? <Wallet next={next} /> : ''}
      {walletStep.step === 2 ? <EmptyAccount back={back} next={next} /> : ''}
    </AuthProvider>
  );
}
