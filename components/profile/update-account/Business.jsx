import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import TextArea from '@/reusable/TextArea';
import Select from '@/reusable/Select';
import { useRouter } from 'next/router';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { BUSINESS_DETAILS } from '@/services/profile/update-account/index';
import { getStates, getCity } from '@/helpers/index';
import { ResponseHandler } from '@/helpers/index';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min';

export default function Business() {
  const [businessReg, setBusinessReg] = useState(false);
  const [state, setState] = useState('');
  const [stateError, setStateError] = useState('');
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessNameError, setBusinessnameError] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentAddressError, setCurrentAddressError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const { user } = useGlobalStore();
  const submitHandler = () => {
    if (
      businessName === '' ||
      currentAddress === '' ||
      city === '' ||
      state === ''
    ) {
      if (businessName === '') {
        setBusinessnameError('Business Name is Required');
      }
      if (currentAddress === '') {
        setCurrentAddressError('Current Address is Required');
      }
      if (city === '') {
        setCityError('City is Required');
      }
      if (state === '') {
        setStateError('State is Required');
      }
    } else {
      setIsLoading(true);
      const data = {
        user_id: user ? user.user_id : '',
        business_name: businessName,
        business_registered: false,
        bvn_number: 23424242,
        current_address: currentAddress,
        state: state,
        city: city,
      };
      const callback = (response) => {
        if (response) {
          setIsLoading(false);
          ResponseHandler(response);
          Router.push('/profile/update-account');
        }
      };

      const onError = (error) => {
        console.log(error);
        setIsLoading(false);
      };

      BUSINESS_DETAILS(data, callback, onError);
    }
  };

  const setStateHandler = (data) => {
    setState(data);
    setStateError('');
    setCity('');
  };

  const cityOnChangeHandler = (data) => {
    setCity(data);
    setCityError('');
  };

  const businessNameOnChangeHandler = (data) => {
    setBusinessName(data);
    setBusinessnameError('');
  };

  const currentAddressOnChangeHandler = (data) => {
    setCurrentAddress(data);
    setCurrentAddressError('');
  };

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
            value={businessName.value}
            dispatch={(data) => businessNameOnChangeHandler(data)}
            error={businessNameError}
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
          {businessReg && (
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
              value={currentAddress}
              dispatch={(data) => currentAddressOnChangeHandler(data)}
              error={currentAddressError}
            />
          </div>
          <div>
            <Select
              label={'State'}
              placeholder={'Lagos'}
              dispatch={(data) => setStateHandler(data)}
              options={getStates()}
              error={stateError}
            />
          </div>
          {state && (
            <div>
              <Select
                label={'City'}
                placeholder={'Zuba'}
                dispatch={(data) => cityOnChangeHandler(data)}
                options={getCity(state)}
                error={cityError}
              />
            </div>
          )}

          <Button
            styles={'p-5 block '}
            text='Submit'
            iconRight={'/svg/arrow-right.svg'}
            click={() => submitHandler()}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
