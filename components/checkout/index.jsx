import React, { useState } from 'react';
import Input from '@/reusable/Input';
import Button from '@/reusable/Button';
import Select from '@/reusable/Select';
import SVG from 'react-inlinesvg';
import {
  getStates,
  getCity,
  inputValidatorChecker,
  inputValidatorErrorState,
  emailValidatorChecker,
  emailValidatorError,
} from '@/helpers/index';

export default function Checkout() {
  const [form, setForm] = useState({
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    phoneNumber: '',
    phoneNumberError: '',
    email: '',
    emailError: '',
    country: '',
    countryError: '',
    state: '',
    stateError: '',
    city: '',
    cityError: '',
    firstAddress: '',
    firstAddressError: '',
    secondAddress: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQauntity] = useState(2);

  const onChangeHandler = (data, field, fieldError) => {
    setForm((prev) => {
      return { ...prev, [field]: data, [fieldError]: '' };
    });
  };

  const onPlaceOrder = () => {
    if (
      inputValidatorChecker(form.firstName) &&
      inputValidatorChecker(form.lastName) &&
      inputValidatorChecker(form.phoneNumber) &&
      emailValidatorChecker(form.email) &&
      inputValidatorChecker(form.country) &&
      inputValidatorChecker(form.state) &&
      inputValidatorChecker(form.city) &&
      inputValidatorChecker(form.firstAddress)
    ) {
      setCurrentStep(2);
    } else {
      inputValidatorErrorState(
        form.firstName,
        setForm,
        'firstNameError',
        'First name is required'
      );
      inputValidatorErrorState(
        form.lastName,
        setForm,
        'lastNameError',
        'Last Name is required'
      );
      inputValidatorErrorState(
        form.phoneNumber,
        setForm,
        'phoneNumberError',
        'Phone Number is required'
      );
      emailValidatorError(form.email, setForm);
      inputValidatorErrorState(
        form.country,
        setForm,
        'countryError',
        'Country is required'
      );
      inputValidatorErrorState(
        form.state,
        setForm,
        'stateError',
        'State is required'
      );
      inputValidatorErrorState(
        form.city,
        setForm,
        'cityError',
        'City is required'
      );
      inputValidatorErrorState(
        form.firstAddress,
        setForm,
        'firstAddressError',
        'Address Line 1 is required'
      );
    }
  };

  const addQuantity = () => {
    setQauntity(quantity + 1);
  };

  const reduceQuantity = () => {
    setQauntity(quantity - 1);
  };

  let displayQuantity = quantity;
  if (quantity < 10) {
    displayQuantity = `0${quantity}`;
  }
  return (
    <div className='checkout'>
      <div className={`flex items-center justify-between`}>
        <div className='w-24 cursor-pointer'>
          <SVG src='/svg/logo.svg' className='max-w-full' />
        </div>
        <button className='bg-light-cream px-4 py-3 border border-light-border rounded text-app-color font-semibold text-sm'>
          Request Support
        </button>
      </div>
      <div className='w-full flex justify-center items-center mt-4 flex-col'>
        <div className='w-full flex justify-center items-center'>
          <img src='/images/model-1.png' className='max-w-full' />
        </div>
        <div className='flex items-center justify-between w-full mt-4'>
          <img src='/images/model-2.png' />
          <img src='/images/model-3.png' />
          <img src='/images/model-4.png' />
          <img src='/images/model-5.png' />
        </div>
      </div>
      <div className='mt-8'>
        <button className='font-semibold text-sm text-app-text py-2 px-4 bg-app-brown border border-dark-brown rounded'>
          Osamudiamen’s Store
        </button>
        <h2 className='font-medium text-2xl mt-4'>Beautiful Red Summer Gown</h2>
        <h4 className='text-app-text font-semibold text-sm mt-3'>
          Product Discription
        </h4>
        <p className='text-app-text text-sm mt-2'>
          Once upon a time, there was a little girl who lived in a village near
          the forest. Whenever she went out, the little girl wore a red riding
          cloak, so everyone in the village called her Little Red Riding Hood.
        </p>
        <div className='flex justify-between items-center mt-5'>
          <div>
            <p className='text-app-text text-sm mb-1'>Quantity</p>
            <div className='flex w-40 justify-around h-12 border border-app-text'>
              <div
                className='flex items-center justify-center border-r border-app-text w-full cursor-pointer'
                onClick={() => reduceQuantity()}
              >
                <button className='flex items-center justify-center'>
                  <SVG src='/svg/minus.svg' />
                </button>
              </div>
              <div className='flex items-center justify-center w-full'>
                <p className='text-app-color font-semibold text-sm'>
                  {displayQuantity}
                </p>
              </div>
              <div
                className='flex items-center justify-center border-l border-app-text w-full cursor-pointer'
                onClick={() => addQuantity()}
              >
                <button className='flex justify-center items-center'>
                  <SVG src='/svg/add-item.svg' />
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className='font-semibold text-xs text-nice-brown ml-auto max-w-min'>
              Price
            </p>
            <p className='text-pry-black font-semibold text-2xl'>₦24,500</p>
          </div>
        </div>
      </div>
      <div className=''>
        <div className='mt-8'>
          <h3 className='text-app-text font-semibold text-base pb-3 border-b border-lightest-color'>
            Contact Details
          </h3>
          {currentStep === 1 && (
            <div>
              <div className='mt-6'>
                <Input
                  label={'First Name'}
                  placeholder={'Enter First Name'}
                  value={form.firstName}
                  error={form.firstNameError}
                  dispatch={(data) =>
                    onChangeHandler(data, 'firstName', 'firstNameError')
                  }
                />
              </div>
              <div className='mt-6'>
                <Input
                  label={'Email'}
                  placeholder={'Enter Email Address'}
                  value={form.email}
                  error={form.emailError}
                  dispatch={(data) =>
                    onChangeHandler(data, 'email', 'emailError')
                  }
                />
              </div>
              <div className='mt-6'>
                <Input
                  label={'Last Name'}
                  placeholder={'Enter Last Name'}
                  value={form.lastName}
                  error={form.lastNameError}
                  dispatch={(data) =>
                    onChangeHandler(data, 'lastName', 'lastNameError')
                  }
                />
              </div>
              <div className='mt-6'>
                <Input
                  label={'Phone Number'}
                  placeholder={'Enter Phone Number'}
                  value={form.phoneNumber}
                  error={form.phoneNumberError}
                  dispatch={(data) =>
                    onChangeHandler(data, 'phoneNumber', 'phoneNumberError')
                  }
                />
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className='bg-app-cream-light border border-dark-brown rounded p-4 mt-3'>
              <p className='font-semibold text-sm text-app-text'>{`${form.firstName} ${form.lastName}`}</p>
              <p className='text-app-text text-sm'>{`${form.email}`}</p>
              <p className='text-app-text text-sm'>{`${form.phoneNumber}`}</p>
            </div>
          )}
        </div>
        <div className='mt-8'>
          <h3 className='text-app-text font-semibold text-base pb-3 border-b border-lightest-color'>
            Delivery Details
          </h3>
          {currentStep === 1 && (
            <div>
              <div className='mt-6'>
                <Select
                  label={'Country'}
                  placeholder={'Selected Country'}
                  initialValue={form.country}
                  error={form.countryError}
                  dispatch={(data) =>
                    onChangeHandler(data, 'country', 'countryError')
                  }
                  options={[{ name: 'Nigeria' }]}
                />
              </div>
              <div className='mt-6'>
                <Select
                  label={'State'}
                  placeholder={'Select State'}
                  value={form.state}
                  error={form.stateError}
                  dispatch={(data) =>
                    onChangeHandler(data, 'state', 'stateError')
                  }
                  options={getStates()}
                />
              </div>
              <div className='mt-6'>
                <Select
                  label={'City'}
                  placeholder={'Select City'}
                  value={form.city}
                  error={form.cityError}
                  dispatch={(data) =>
                    onChangeHandler(data, 'city', 'cityError')
                  }
                  options={getCity(form.state)}
                />
              </div>
              <div className='mt-6'>
                <Input
                  label={'Address Line 1'}
                  placeholder={'Enter Address Line 1'}
                  value={form.firstAddress}
                  error={form.firstAddressError}
                  dispatch={(data) =>
                    onChangeHandler(data, 'firstAddress', 'firstAddressError')
                  }
                />
              </div>
              <div className='mt-6'>
                <Input
                  label={'Address Line 2'}
                  placeholder={'Enter Address Line 2'}
                  value={form.secondAddress}
                  dispatch={(data) => onChangeHandler(data, 'secondAddress')}
                />
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className='bg-app-cream-light border border-dark-brown rounded p-4 pb-9 mt-3'>
              <p className='font-semibold text-sm text-app-text'>{`${form.state}, ${form.country}`}</p>
              <p className='text-app-text text-sm'>{`${form.city}`}</p>
              <p className='text-app-text text-sm'>{`${form.firstAddress}. ${form.secondAddress}`}</p>
            </div>
          )}
        </div>
      </div>
      {currentStep === 1 && (
        <div className='ml-auto w-36 mt-6'>
          <Button
            text={'Place Order'}
            styles={'justify-center items-center bg-app-color'}
            click={() => onPlaceOrder()}
          />
        </div>
      )}
      {currentStep === 2 && (
        <div className='mt-6'>
          <div className='max-w-max ml-auto'>
            <div className='flex border-b-4 border-app-color'>
              <div className='flex flex-col mr-4'>
                <p className='font-semibold text-xs text-nice-brown'>
                  Product Price
                </p>
                <p className='font-semibold text-base text-app-text text-right'>
                  ₦24,500
                </p>
              </div>
              <div>
                <p className='font-semibold text-xs text-nice-brown'>
                  Delivery Fee
                </p>
                <p className='font-semibold text-base text-app-text text-right'>
                  ₦3,500
                </p>
              </div>
            </div>
            <div className='mt-2 flex flex-col'>
              <p className='font-semibold text-xs text-nice-brown text-right'>
                Total Price
              </p>
              <p className='font-bold text-2xl text-pry-black text-right'>
                ₦27,800
              </p>
            </div>
          </div>
          <div className='mt-6'>
            <Button
              text={'Proceed to Secure Payment'}
              iconLeft={'/svg/payment.svg'}
              color={'green'}
              
            />
          </div>
        </div>
      )}
      <div className='flex justify-center items-center py-6 border-t border-lightest-color mt-20'>
        <p className='text-sm text-app-color'>
          ©Copyright, ShareSell. 2020,{' '}
          <span className='underline'>Terms & Conditions</span>
        </p>
      </div>
    </div>
  );
}
