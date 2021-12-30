import AppHeader from '@/components/AppHeader';
import ImageModal from '@/components/ImageModal';
import { getStates, getCity } from '@/helpers/index';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import Button from '@/reusable/Button';
import Modal from '@/reusable/Modal';
import Select from '@/reusable/Select';
import { GET_QUOTE, GET_SINGLE_PRODUCT } from '@/services/products';
import axios from 'axios';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';

export default function ProductSlug() {
  const { currentProduct, role } = useGlobalStore();

  const [product, setProduct] = useState([]);
  const [imageOptions, setImageOptions] = useState([]);
  const [data, setData] = useState({
    product_id: null,
    state: null,
    city: null,
    stateError: null,
    cityError: null,
  });
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (currentProduct.length < 1) {
      router.back();
    } else {
      getProduct(currentProduct.id);
    }
  }, [currentProduct]);

  const getProduct = (id) => {
    const callback = (response) => {
      const { payload } = response;
      let images = JSON.parse(payload.product_images);
      setData((prevState) => ({ ...prevState, product_id: payload.id }));
      var image_filtered = [];
      images.forEach((img, i) => {
        if (i === 0) {
          image_filtered.push({
            src: img.image,
            width: 4,
            height: 3,
          });
        } else {
          image_filtered.push({
            src: img.image,
            width: 3,
            height: 3,
          });
        }
      });

      setImageOptions(image_filtered);

      setProduct(payload);
    };
    const onError = (error) => {
      console.log(error);
    };
    GET_SINGLE_PRODUCT(id, callback, onError);
  };

  const setStateHandler = (data) => {
    setData((prevState) => ({
      ...prevState,
      state: data,
      stateError: '',
      city: '',
    }));
  };

  const cityOnChangeHandler = (data) => {
    setData((prevState) => ({
      ...prevState,
      city: data,
      cityError: '',
    }));
  };

  const getQuote = async () => {
    const form = {
      product_id: data.product_id,
      state: data.state,
      city: data.city,
    };

    const callback = (response) => {
      console.log(response);
    };
    const onError = (error) => {
      console.log(error);
    };

    await GET_QUOTE(form, callback, onError);
  };
  return (
    <div className='product-slug '>
      <AppHeader edit='Edit Product' />

      <h3 className='text-3xl mt-5'>Product Details</h3>
      <div className='w-full flex flex-col mt-5'>
        <p className='text-app-text'>{product.product_name}</p>
        <ImageModal photos={imageOptions} />

        <div className='flex flex-col my-3 p-2'>
          <span className='text-app-color font-medium'>
            Product Description
          </span>
          <p>{product.product_description}</p>
        </div>
        <div className='flex justify-between p-2'>
          <div className='flex flex-col '>
            <p className='text-app-color font-medium'>Weight</p>
            <span className='font-light'>{product.product_weight}</span>
          </div>
          <div className='flex flex-col '>
            <p className='text-app-color font-medium'>Size</p>
            <span className='font-light'>{product.product_size}</span>
          </div>
          <div className='flex flex-col '>
            <p className='text-app-color font-medium'>Stock Left</p>
            <span className='font-light'>{product.product_number}</span>
          </div>
        </div>
        <div className='flex  justify-between p-2'>
          <div className='flex flex-col '>
            <p className='text-app-color font-medium'>Product Price</p>
            <span className='font-light'>N{product.product_price}</span>
          </div>

          <div className='flex flex-col mx-5'>
            <p className='text-app-color font-medium'>Suggested Retail Price</p>
            <span className='font-light'>N{product.product_retail_price}</span>
          </div>
        </div>
        <div className='flex p-2'>
          <div className='flex flex-col '>
            <p className='text-app-color font-medium'>Product Quantity</p>
            <span className='font-light'>{product.product_quantity}</span>
          </div>
        </div>

        {role === 'Supplier' ? (
          <div className='w-full flex center items-center justify-center mt-10 pb-52'>
            <button className='flex bg-red-50 p-3 px-7 rounded transition-all hover:bg-red-200'>
              <span className='text-red-500 m-auto'>Delete</span>
              <SVG
                className='text-red-500 m-auto mx-1'
                src='/svg/delete-bin.svg'
              />
            </button>
          </div>
        ) : (
          ''
        )}
        {role === 'Reseller' ? (
          <div className='w-full   mt-10 pb-52'>
            <button
              className='w-full flex text-app-color justify-between block p-4 bg-white rounded border border-app-color outline-none'
              onClick={() => setModal(!modal)}
            >
              Calculate Delivery Fee
              <SVG className='mx-2 my-auto' src='/svg/truck.svg' />
            </button>
            <Button
              color='green'
              styles='mt-5 bg-red-500'
              text='Generate Payment Link'
              iconRight='/svg/payment.svg'
            />
          </div>
        ) : null}
      </div>

      <Modal
        title='Calculate Delivery Fee'
        toggle={modal}
        dispatch={() => setModal(false)}
      >
        <div className='w-full'>
          <span className='text-app-color text-xs'>
            Select the destination state and city <br /> to get the delivery fee
          </span>

          <div>
            <Select
              label={'State'}
              placeholder={'Select State'}
              initialValue={data.state}
              dispatch={(data) => setStateHandler(data)}
              options={getStates()}
              error={data.stateError}
            />
          </div>
          {data.state && (
            <div>
              <Select
                label={'City'}
                placeholder={'Select City'}
                dispatch={(data) => cityOnChangeHandler(data)}
                options={getCity(data.state)}
                error={data.cityError}
                initialValue={data.city}
              />
            </div>
          )}

          <Button text='Calculate' click={() => getQuote()} />
        </div>
      </Modal>
    </div>
  );
}
