import React, { useState } from 'react';
import AppHeader from '../AppHeader';
import AccountTab from '../account-tab';
import Button from '@/reusable/Button';
import Select from '@/reusable/Select';

export default function Account({ next, back }) {
  const Accounts = [
    {
      logo: '/svg/gt-logo.svg',
      name: 'Osamudiamen Imasuen',
      bank: 'GT Bank PLC',
      number: '0111555814',
    },
    {
      logo: '/svg/access.svg',
      name: 'Osamudiamen Imasuen',
      bank: 'Access Bank PLC',
      number: '0724463022',
    },
  ];
  const [selected, setSelected] = useState(true);
  return (
    <div className='mt-4'>
      <AppHeader noSVG click={back} />
      <div className=''>
        <h2 className='text-2xl font-medium text-pry-black my-4'>Accounts</h2>
        <div>
          {Accounts.map((account, index) => (
            <AccountTab
              key={index}
              account={account}
              id={index}
              setSelected={setSelected}
              isActive={selected === index ? true : false}
            />
          ))}
        </div>
        <div className='mt-5'>
          <Button
            text={'Proceed'}
            iconRight={'/svg/arrow-right.svg'}
            click={next}
          />
        </div>
      </div>
    </div>
  );
}
