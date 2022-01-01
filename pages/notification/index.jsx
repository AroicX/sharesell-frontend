import React, { useState } from 'react';
import Notifications from '@/components/notification';
import NotificationDetail from '@/components/notification/NotificationDetail';

export default function NotificationPage() {
  const [currentStep, setCurrentStep] = useState({ step: 1 });
  return (
    <>
      {currentStep.step === 1 ? (
        <Notifications
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ) : (
        ''
      )}
      {currentStep.step === 2 ? (
        <NotificationDetail
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      ) : (
        ''
      )}
    </>
  );
}
