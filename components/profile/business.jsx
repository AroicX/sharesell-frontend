import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import TextArea from '@/reusable/TextArea';
import Select from '@/reusable/Select';
import { useRouter } from 'next/router';

export default function Business() {
  const [BusinessReg, setBusinessReg] = useState(false);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const Router = useRouter();
  return (
    <div className='mt-4 mb-10'>
      <AppHeader noSVG />
      <div className='business-detail'>
        <h2 className='text-3xl font-light my-2'>Business Details</h2>
        <span className='text-app-text'>
          Kindly give us simple details of the business.
        </span>
        <div className='business-detail-content mt-8'>
          <Input
            label={'Business Name'}
            type='text'
            placeholder={'Chika Inc'}
          />
          <div className='flex flex-col mb-4'>
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
          <div className='mt-8'>
            <TextArea
              label={'Current Business Address'}
              placeholder={'No. 4, James st, Zuba, Abuja.'}
            />
          </div>
          <div>
            <Select
              label={'State'}
              placeholder={'Lagos'}
              dispatch={(data) => setState(data)}
              options={['Lagos', 'Abuja', 'Kaduna']}
            />
          </div>
          <div>
            <Select
              label={'City'}
              placeholder={'Zuba'}
              dispatch={(data) => setCity(data)}
              options={['Ikeja', 'Zuba', 'BArnawa']}
            />
          </div>
          <Button
            styles={'p-5 block '}
            text='Submit'
            iconRight={'/svg/arrow-right.svg'}
            click={() => Router.back()}
          />
        </div>
      </div>
    </div>
  );
}
