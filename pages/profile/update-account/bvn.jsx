import React, { useState } from 'react';
import AuthProvider from '@/components/AuthProvider';
import BVN from '@/components/profile/update-account/bvn';
import VerifyBVN from '@/components/profile/update-account/bvn/VerifyBVN';
import BVNSuccess from '@/components/profile/update-account/bvn/BVNSuccess';

export default function BVNPage() {
  const [bvnStep, setBvnStep] = useState(1);
  const next = () => {
    setBvnStep((prev) => prev + 1);
  };
  const back = () => {
    if (bvnStep > 1) {
      setBvnStep((prev) => prev - 1);
    }
  };
  return (
    <AuthProvider>
      {bvnStep === 1 ? <BVN next={next} /> : ''}{' '}
      {bvnStep === 2 ? <VerifyBVN next={next} back={back} /> : ''}
      {bvnStep === 3 ? <BVNSuccess /> : ''}
    </AuthProvider>
  );
}
