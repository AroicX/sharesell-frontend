import React, { useState } from 'react';
import AuthProvider from 'components/AuthProvider';
import Subscription from 'components/profile/subscription';
import SubscriptionCheckout from 'components/profile/subscriptionCheckout';
import SubscriptionSuccess from 'components/profile/subscription-success';

export default function SubscriptionPage() {
  const [subscriptionStep, setSubscriptionStep] = useState({ step: 1 });
  return (
    <AuthProvider>
      {subscriptionStep.step === 1 ? (
        <Subscription setSubscriptionStep={setSubscriptionStep} />
      ) : (
        ''
      )}
      {subscriptionStep.step === 2 ? (
        <SubscriptionCheckout
          subscriptionStep={subscriptionStep}
          setSubscriptionStep={setSubscriptionStep}
        />
      ) : (
        ''
      )}
      {subscriptionStep.step === 3 ? <SubscriptionSuccess subscriptionStep={subscriptionStep}/>: ""}

    </AuthProvider>
  );
}
