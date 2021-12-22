import React, { useState } from 'react';

import Input from 'reusable/Input';
import Button from 'reusable/Button';
import AppHeader from 'components/AppHeader';

export default function BusinessRegistration({ next, back }) {
  const [BusinessReg, setBusinessReg] = useState(false);
  return (
    <div className='Business-Auth'>
      <AppHeader click={back} />
      <div className='business'>
        <h2 className='text-3xl font-light my-2'>Business Name</h2>
        <span className='text-app-text'>Enter your business name.</span>
        <div className='business-name'>
          <Input
            label={'Business Name'}
            type='text'
            placeholder={'Chika Inc'}
          />
          <div className='flex flex-col mb-2'>
            <p className='text-app-text text-base mb-2'>
              Is your busines registered?
            </p>
            <div className='flex items-center'>
              <div className='flex items-center'>
                <label className='text-app-text text-base'>Yes</label>
                <input
                  type='radio'
                  name='business-reg'
                  onClick={() => setBusinessReg(true)}
                  className='mx-4'
                />
              </div>
              <div className='flex items-center'>
                <label className='text-app-text text-base'>No</label>
                <input
                  type='radio'
                  name='business-reg'
                  onClick={() => setBusinessReg(false)}
                  className='mx-4'
                />
              </div>
            </div>
          </div>
          {BusinessReg && (
            <Input
              label={'RC / BN Number'}
              type='text'
              placeholder={'Enter RC / BN Number'}
            />
          )}
          <Button
            styles={'p-5 block '}
            text='Submit'
            iconRight={'/svg/arrow-right.svg'}
            click={next}
          />
        </div>
      </div>
    </div>
  );
}
