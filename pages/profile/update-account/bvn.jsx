import React, { useState } from 'react';
import AuthProvider from '@/components/AuthProvider';
import BVN from '@/components/profile/bvn';

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
  return <AuthProvider>{bvnStep === 1 ? <BVN next={next}/> : ''}</AuthProvider>;
}
