import React, { useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import UpdateTab from '@/components/UpdateTab';
import { useRouter } from 'next/router';
import { _protectedRequest } from 'services';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import useSWR from 'swr';

export default function UpdateAccount() {
  const Router = useRouter();
  const { setUserProfile } = useGlobalStore();
  const { data, error } = useSWR(`/user/profile`, _protectedRequest);
  const user_profile = data ? data.payload : null;
  const details = [
    {
      title: 'Busniess Details',
      info: 'Business name and other relevant details',
      progress: '100%',
      isComplete: true,
      completeIcon: '/svg/business-complete.svg',
      inCompleteIcon: '/svg/business-incomplete.svg',
      to: '/profile/update-account/business',
    },
    {
      title: 'Contact Person',
      info: 'Provide accurate contact details',
      progress: '0%',
      isComplete: false,
      completeIcon: '/svg/contact-complete.svg',
      inCompleteIcon: '/svg/contact-incomplete.svg',
      to: '/profile/update-account/contact',
    },
    {
      title: 'BVN',
      info: 'Bank Verification Number',
      progress: '100%',
      isComplete: true,
      completeIcon: '/svg/bvn-complete.svg',
      inCompleteIcon: '/svg/bvn-incomplete.svg',
      to: '/profile/update-account/bvn',
    },
    {
      title: 'Next Of Kin',
      info: 'Accurate contact details of Next Of Kin',
      progress: '0%',
      isComplete: false,
      completeIcon: '/svg/kin-complete.svg',
      inCompleteIcon: '/svg/kin-incomplete.svg',
      to: '/profile/update-account/kin',
    },
  ];

  useEffect(() => {
    if (user_profile) {
      setUserProfile(user_profile);
    }
  }, [user_profile]);
  return (
    <div className='mt-4'>
      <AppHeader noSVG styles='py-5' click={() => Router.push('/profile')} />
      <div className='mt-20'>
        <h2 className='text-2xl font-light my-2'>Update & Activate Account</h2>
        <div className='flex flex-col'>
          {details.map((detail, index) => (
            <UpdateTab key={index} detail={detail} />
          ))}
        </div>
      </div>
    </div>
  );
}
