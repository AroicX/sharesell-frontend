import React, { useState } from 'react';
import AuthProvider from '@/components/AuthProvider';
import Wallet from '@/components/profile/wallet';
import EmptyAccount from '@/components/profile/wallet/EmptyAccount';
import AddAccount from '@/components/profile/wallet/AddAccount';
import Account from '@/components/profile/wallet/Account';
import CreatePin from '@/components/profile/wallet/CreatePin';
import EnterPin from '@/components/profile/wallet/EnterPin';
import WidthdrawalSuccess from '@/components/profile/wallet/WidthdrawalSuccess';

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
      {walletStep.step === 3 ? <AddAccount back={back} next={next}/> : ''}
      {walletStep.step === 4 ? <Account back={back} next={next}/> : ""}
      {walletStep.step === 5 ? <CreatePin back={back} next={next}/> : ""}
      {walletStep.step === 6 ? <EnterPin back={back} next={next}/> : ""}
      {walletStep.step === 7 ? <WidthdrawalSuccess /> : ""}
    </AuthProvider>
  );
}
