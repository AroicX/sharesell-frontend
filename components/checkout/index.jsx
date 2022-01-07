import React, { useEffect, useState } from 'react';
import NextHead from 'next/head';

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
  ImageFilter,
} from '@/helpers/index';
import { GET_QUOTE_BY_ID } from '@/services/checkout';
import Loader from '@/reusable/Loader';
import ImageModal from '../ImageModal';
import { GET_QUOTE } from '@/services/products';
import PaymentWithPaystack from '../paystack';
import Swal from 'sweetalert2';

var total_cost = '';
var seller_price = '';
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
    country: 'Nigeria',
    countryError: '',
    state: '',
    stateError: '',
    city: '',
    cityError: '',
    firstAddress: '',
    firstAddressError: '',
    secondAddress: '',
    delivery_fee: '',
    rate_key: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQauntity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(null);
  const [product, setProduct] = useState(null);
  const [reseller, setReseller] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [resellerPrice, setResellerPrice] = useState(null);
  const [imageOptions, setImageOptions] = useState([]);

  useEffect(() => {
    let id = window.location.href;
    getGetById(id.split('/checkout/')[1]);
  }, []);

  const getGetById = (quote_id) => {
    const callback = (response) => {
      const { payload } = response;
      const { reseller, product, supplier } = payload;
      setForm((prevState) => ({
        ...prevState,
        state: payload.destination_state,
        city: payload.destination_city,
        delivery_fee: payload.delivery_fee,
      }));
      setPayload(payload);
      total_cost = payload.total_cost;
      seller_price = payload.reseller_price;
      setResellerPrice(payload.reseller_price);
      setImageOptions(ImageFilter(JSON.parse(product.product_images)));
      setProduct(product);
      setReseller(reseller);
      setSupplier(supplier);
    };

    const onError = (error) => {
      if (error?.response?.data) {
        Swal.fire({
          title: 'ERROR',
          text: 'Product Not Found',
          icon: 'error',
          timerProgressBar: true,
          timer: 5000,
          allowOutsideClick: true,
          showConfirmButton: false,
        });
      }
    };

    GET_QUOTE_BY_ID(quote_id, callback, onError);
  };

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
      getQuote();
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

  const getQuote = async () => {
    setLoading(true);
    const data = {
      product_id: product.id,
      state: form.state,
      city: form.city,
    };

    const callback = (response) => {
      if (response.status === 'success') {
        setLoading(false);
        setForm((prevState) => ({
          ...prevState,
          delivery_fee: response.payload.amount,
          rate_key: response.payload.rate_key,
        }));
        setCurrentStep(2);
      }
    };
    const onError = (error) => {
      console.log(error);
    };

    await GET_QUOTE(data, callback, onError);
  };

  const addQuantity = () => {
    setQauntity(quantity + 1);
    setResellerPrice(seller_price * (quantity + 1));
  };

  const reduceQuantity = () => {
    if (quantity > 1) {
      setQauntity(quantity - 1);
      setResellerPrice(seller_price * (quantity - 1));
    }
  };

  const calculateTotal = () => {
    let _total = parseInt(resellerPrice) + parseInt(form.delivery_fee);

    return _total.toLocaleString();
  };

  return (
    <>
      <NextHead>
        <script src='https://js.paystack.co/v1/inline.js'></script>
      </NextHead>
      {payload && product && supplier && reseller ? (
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
            <ImageModal photos={imageOptions} />
          </div>
          <div className='mt-8'>
            <button className='font-semibold text-sm text-app-text py-2 px-4 bg-app-brown border border-dark-brown rounded'>
              {supplier.business_name}
            </button>
            <h2 className='font-medium text-2xl mt-4'>
              {product.product_name}
            </h2>
            <h4 className='text-app-text font-semibold text-sm mt-3'>
              Product Discription
            </h4>
            <p className='text-app-text text-sm mt-2'>
              {product.product_description}
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
                      {`0${quantity}`}
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
                <p className='text-pry-black font-semibold text-2xl'>
                  ₦{resellerPrice.toLocaleString()}
                </p>
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
                        onChangeHandler(
                          data,
                          'firstAddress',
                          'firstAddressError'
                        )
                      }
                    />
                  </div>
                  <div className='mt-6'>
                    <Input
                      label={'Address Line 2'}
                      placeholder={'Enter Address Line 2'}
                      value={form.secondAddress}
                      dispatch={(data) =>
                        onChangeHandler(data, 'secondAddress')
                      }
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
                loading={loading}
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
                      ₦{resellerPrice?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className='font-semibold text-xs text-nice-brown'>
                      Delivery Fee
                    </p>
                    <p className='font-semibold text-base text-app-text text-right'>
                      ₦{form.delivery_fee.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className='mt-2 flex flex-col'>
                  <p className='font-semibold text-xs text-nice-brown text-right'>
                    Total Price
                  </p>
                  <p className='font-bold text-2xl text-pry-black text-right'>
                    ₦{calculateTotal()}
                  </p>
                </div>
              </div>
              <div className='mt-6'>
                <PaymentWithPaystack
                  fullname={`${form.firstName} ${form.lastName}`}
                  phone={form.phoneNumber}
                  amount={parseInt(resellerPrice) + parseInt(form.delivery_fee)}
                  email={form.email}
                  loading={loading}
                  payload={payload}
                  state={form.state}
                  city={form.city}
                  address={form.firstAddress}
                  rate_key={form.rate_key}
                  quantity={quantity}
                  dispatch={(message) => {
                    Swal.fire({
                      title: 'Alert',
                      text: message,
                      icon: 'success',
                      timerProgressBar: true,
                      timer: 2000,
                      allowOutsideClick: true,
                      showConfirmButton: false,
                    });
                  }}
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
      ) : (
        <div className='mt-20'>
          <Loader />
        </div>
      )}
    </>
  );
}
