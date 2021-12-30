import React, { useState, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import TextArea from '@/reusable/TextArea';
import Select from '@/reusable/Select';
import { useRouter } from 'next/router';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { BUSINESS_DETAILS } from '@/services/profile/update-account/index';
import {
  getStates,
  getCity,
  ResponseHandler,
  inputValidatorChecker,
  inputValidatorErrorState,
} from '@/helpers/index';

export default function Business() {
  const { user, userProfile } = useGlobalStore();
  const [form, setForm] = useState({
    businessReg: false,
    businessName: userProfile ? userProfile.supplier.business_name : '',
    businesNameError: '',
    state: userProfile ? userProfile.supplier.state : '',
    stateError: '',
    city: userProfile ? userProfile.supplier.city : '',
    cityError: '',
    currentAddress: userProfile ? userProfile.supplier.current_address : '',
    currentAddressError: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  const submitHandler = () => {
    if (
      inputValidatorChecker(form.businessName) &&
      inputValidatorChecker(form.currentAddress) &&
      inputValidatorChecker(form.state) &&
      inputValidatorChecker(form.city)
    ) {
      setIsLoading(true);
      const data = {
        user_id: user ? user.user_id : '',
        business_name: form.businessName,
        business_registered: false,
        bvn_number: 23424242,
        current_address: form.currentAddress,
        state: form.state,
        city: form.city,
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
    } else {
      inputValidatorErrorState(
        form.businessName,
        setForm,
        'businessNameError',
        'Business Name is required'
      );
      inputValidatorErrorState(
        form.currentAddress,
        setForm,
        'currentAddressError',
        'Current Address is required'
      );
      inputValidatorErrorState(
        form.state,
        setForm,
        'stateError',
        'State is required'
      );
      inputValidatorErrorState(form.city, setForm, 'cityError', 'City is Required');
    }
  };
  const onChangeHandler = (data, field, fieldError) => {
    if (field === 'state') {
      setForm((prev) => {
        return { ...prev, [field]: data, [fieldError]: '', city: '' };
      });
    } else {
      setForm((prev) => {
        return { ...prev, [field]: data, [fieldError]: '' };
      });
    }
  };
  const setBusinessReg = (value) => {
    setForm((prev) => {
      return { ...prev, businessReg: value };
    });
  };

  useEffect(() => {
    if (!userProfile) {
      Router.push('/profile/update-account');
    }
  }, [userProfile]);

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
            value={form.businessName ? form.businessName : ''}
            dispatch={(data) =>
              onChangeHandler(data, 'businessName', 'businessNameError')
            }
            error={form.businessNameError}
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
          {form.businessReg && (
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
              value={form.currentAddress ? form.currentAddress : ''}
              dispatch={(data) =>
                onChangeHandler(data, 'currentAddress', 'currentAddressError')
              }
              error={form.currentAddressError}
            />
          </div>
          <div>
            <Select
              label={'State'}
              placeholder={'Lagos'}
              initialValue={form.state}
              dispatch={(data) => onChangeHandler(data, 'state', 'stateError')}
              options={getStates()}
              error={form.stateError}
            />
          </div>
          {form.state && (
            <div>
              <Select
                label={'City'}
                placeholder={'Zuba'}
                dispatch={(data) => onChangeHandler(data, 'city', 'cityError')}
                options={getCity(form.state)}
                error={form.cityError}
                initialValue={form.city}
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
