import AppHeader from '@/components/AppHeader';
import ImageModal from '@/components/ImageModal';
import {
  getStates,
  getCity,
  convertPricetoNumber,
  inputFormatter,
  ImageFilter,
} from '@/helpers/index';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import Button from '@/reusable/Button';
import Input from '@/reusable/Input';
import Modal from '@/reusable/Modal';
import Select from '@/reusable/Select';
import {
  GET_QUOTE,
  GET_SINGLE_PRODUCT,
  GENERATE_PAYMENT_LINK,
} from '@/services/products';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from '@/components/Link';
import Swal from 'sweetalert2';

export default function ProductSlug() {
  const { currentProduct, role } = useGlobalStore();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [imageOptions, setImageOptions] = useState([]);
  const [data, setData] = useState({
    product_id: null,
    state: null,
    city: null,
    stateError: null,
    cityError: null,
    delivery_fee: '',
    rate_key: null,
    url: null,
    selling_price: null,
    total_cost: '',
    profit: '',
  });
  const [modal, setModal] = useState(false);
  const [generateLink, setGenerateLink] = useState(false);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (currentProduct.length < 1) {
      router.back();
    } else {
      getProduct(currentProduct.id);
    }
  }, [currentProduct]);

  const getProduct = (id) => {
    // setLoading(true);
    const callback = (response) => {
      const { payload } = response;

      setData((prevState) => ({ ...prevState, product_id: payload.id }));

      setImageOptions(ImageFilter(JSON.parse(payload.product_images)));
      setProduct(payload);
      setLoading(false);
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
    setLoading(true);
    const form = {
      product_id: data.product_id,
      state: data.state,
      city: data.city,
    };

    const callback = (response) => {
      if (response.status === 'success') {
        setModal(false);
        setLoading(false);
        setData((prevState) => ({
          ...prevState,
          delivery_fee: response.payload.amount,
          rate_key: response.payload.rate_key,
        }));
        setModal(!modal);
        setGenerateLink(!generateLink);
      }
    };
    const onError = (error) => {
      console.log(error);
    };

    await GET_QUOTE(form, callback, onError);
  };

  const calculateProfit = (value) => {
    let price = product.product_price;
    if (value > price) {
      let profit = parseInt(value) - parseInt(price);
      setData((prevState) => ({
        ...prevState,
        selling_price: value,
        profit: profit,
        total_cost: parseInt(value) + parseInt(data.delivery_fee),
      }));
    }
  };

  const checkStatus = () => {
    if (data.city === null || data.state === null) {
      Swal.fire({
        text: 'Calculate Delivery Fee, before Generating Link',
        timerProgressBar: true,
        timer: 2000,
        allowOutsideClick: true,
        showConfirmButton: false,
      });
    } else {
      setGenerateLink(!generateLink);
    }
  };
  const getLink = async () => {
    const {
      product_id,
      state,
      city,
      delivery_fee,
      rate_key,
      selling_price,
      total_cost,
    } = data;
    const quote = {
      product_id: product_id,
      state: state,
      city: city,
      delivery_fee: delivery_fee,
      rate_key: rate_key,
      reseller_price: selling_price,
      total_cost: total_cost,
    };

    const callback = (response) => {
      if (response.status === 'success') {
        const { payload } = response;
        setData((prevState) => ({
          ...prevState,
          url: payload.url,
        }));
      }
    };
    const onError = (error) => {
      console.log(error);
    };

    await GENERATE_PAYMENT_LINK(quote, callback, onError);
  };

  return (
    <div className='product-slug mt-20'>
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
            <span className='font-light'>
              ₦{product.product_price?.toLocaleString()}
            </span>
          </div>

          <div className='flex flex-col mx-5'>
            <p className='text-app-color font-medium'>Suggested Retail Price</p>
            <span className='font-light'>
              ₦{product.product_retail_price?.toLocaleString()}
            </span>
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
            {data.delivery_fee ? (
              <>
                <div className='w-full flex flex-col bg-app-cream p-2 mt-5 rounded'>
                  <div className='w-full my-2 flex justify-between'>
                    <span className='text-app-color'>
                      From: {product.state}
                    </span>
                    <span className='text-app-color'>-------</span>
                    <span className='text-app-color'>To: {data.state}</span>
                  </div>
                  <p className='text-app-color text-lg font-medium float-right flex-end'>
                    Delivery Fee: <b>₦{data.delivery_fee?.toLocaleString()}</b>
                  </p>
                </div>
              </>
            ) : null}

            <Button
              color='green'
              styles='mt-5 '
              text='Generate Payment Link'
              iconRight='/svg/payment.svg'
              click={() => checkStatus()}
              loading={loading}
            />
          </div>
        ) : null}
      </div>

      {role === 'Reseller' ? (
        <>
          <Modal
            title='Calculate Delivery Fee'
            toggle={modal}
            dispatch={() => setModal(false)}
          >
            <div className='w-full'>
              <span className='text-app-color text-xs'>
                Select the destination state and city <br /> to get the delivery
                fee
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

              <Button
                text='Calculate'
                styles='bg-app-color'
                click={() => getQuote()}
                loading={loading}
              />
            </div>
          </Modal>
          {/* payment */}
          <Modal
            title='Generate Payment Link '
            toggle={generateLink}
            dispatch={() => setGenerateLink(false)}
          >
            <div className='w-full'>
              <span className='text-app-color text-sm'>
                You can use the suggested retail price <br />
                or input a higher one at your discretion.
              </span>
              <br />
              <br />
              <Input
                type='number'
                label='Selling Price'
                price='true'
                value={data.selling_price}
                dispatch={(value) => calculateProfit(value)}
                disabled='true'
              />
              <div className='w-full flex p-2 bg-cream rounded justify-between'>
                {data.total_cost && (
                  <b className='text-app-color float-left text-xs mb-2'>
                    <span className='text-md'>Total Cost:</span> ₦
                    {inputFormatter(data.total_cost, ',', 3)}
                  </b>
                )}
                <div className='my-auto text-app-color'>-----</div>
                {data.profit && (
                  <b className='text-app-color float-right text-xs my-auto mb-2'>
                    Your Profit: ₦{inputFormatter(data.profit, ',', 3)}
                  </b>
                )}
              </div>

              {data.url ? (
                <>
                  <div className='w-full relative mt-2 flex bg-app-cream p-3 rounded border border-app-color overflow-hidden'>
                    <input
                      className='w-full text-app-color overflow-hidden'
                      type='text'
                      value={data.url}
                      disabled
                    />

                    <CopyToClipboard text={data.url} onCopy={() => {}}>
                      <button className='absolute top-0 right-0 p-3 flex bg-lightest-color text-app-text'>
                        <SVG className='my-auto mx-2' src='/svg/copy.svg' />
                        Copy
                      </button>
                    </CopyToClipboard>
                  </div>
                  <span className='text-app-color font-medium float-left text-xs my-2'>
                    Request for payment with this link!
                  </span>
                  <span className='w-full text-app-text font-medium float-left text-md my-2'>
                    Share on:
                  </span>
                  <div className='w-full flex mt-10'>
                    <Link
                      className='mx-2'
                      to={`https://twitter.com/intent/tweet?url${data.url}`}
                      target='_blank'
                    >
                      <SVG className='my-auto mx-2' src='/svg/whatsapp.svg' />
                    </Link>
                    <Link
                      className='mx-2'
                      to={`https://www.facebook.com/sharer/sharer.php?u${data.url}`}
                      target='_blank'
                    >
                      <SVG className='my-auto mx-2' src='/svg/facebook.svg' />
                    </Link>
                    <Link
                      className='mx-2'
                      to={`https://twitter.com/intent/tweet?url${data.url}`}
                      target='_blank'
                    >
                      <SVG className='my-auto mx-2' src='/svg/twitter.svg' />
                    </Link>
                  </div>
                </>
              ) : (
                <Button
                  text='Generate Link'
                  styles='bg-app-color'
                  click={() => getLink()}
                  loading={loading}
                />
              )}
            </div>
          </Modal>
          {/* payment */}
        </>
      ) : null}
    </div>
  );
}
