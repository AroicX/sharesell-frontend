import React, { useState, useEffect } from 'react';
import Input from '@/reusable/Input';
import Select from '@/reusable/Select';
import TextArea from '@/reusable/TextArea';
import DropZone from '@/reusable/DropZone';
import Button from '@/reusable/Button';
import AuthProvider from '@/components/AuthProvider';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import router from 'next/router';
import {
  selectFilter,
  selectValue,
  slugify,
  getStates,
  getCity,
  inputValidatorChecker,
  inputValidatorErrorState,
  inputFormatter,
  convertPricetoNumber,
} from '@/helpers/index';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GET_SINGLE_PRODUCT, UPDATE_PRODUCT } from '@/services/products';
import Loader from '@/reusable/Loader';

let counter = 0;
let links = [];
export default function EditProduct({}) {
  const { productCategories, user, currentProduct } = useGlobalStore();

  useEffect(() => {
    if (productCategories.length < 1 || currentProduct.length < 1) {
      if (productCategories.length < 1) {
        router.push('/products');
      }
      if (currentProduct.length < 1) {
        router.back();
      }
    } else {
      getProduct(currentProduct.id);
    }
  }, [productCategories]);

  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({
    user_id: user ? user.user_id : '',
    product_id: '',
    product_name: '',
    product_name_error: '',
    product_category: '',
    product_category_display: '',
    product_category_error: '',
    product_description: '',
    product_description_error: '',
    product_price: '',
    product_price_error: '',
    product_weight: '',
    product_weight_error: '',
    product_size: '',
    product_size_error: '',
    product_quantity: '',
    product_quantity_error: '',
    product_number: '',
    product_number_error: '',
    product_retail_price: '',
    product_retail_price_error: '',
    pickup_address: '',
    pickup_address_error: '',
    state: '',
    state_error: '',
    city: '',
    city_error: '',
    product_images: '',
    product_images_display: '',
    product_images_error: '',
  });

  const categoryFormatter = (category_id) => {
    for (let i = 0; i < productCategories.length; i++) {
      if (productCategories[i].category_id === category_id) {
        return productCategories[i].category_name;
      }
    }
  };

  const getProduct = (id) => {
    const callback = (response) => {
      if (response) {
        setLoading(false);
        let productDetail = response.payload;
        setData((prev) => ({
          ...prev,
          ...productDetail,
          product_category_display: categoryFormatter(
            productDetail.product_category
          ),
          product_images_display: productDetail.product_images,
          product_id: productDetail.id,
          product_price: inputFormatter(productDetail.product_price, ',', 3),
          product_retail_price: inputFormatter(
            productDetail.product_retail_price,
            ',',
            3
          ),
        }));
        setLoader(false);
      }
    };
    const onError = (error) => {
      console.log(error);
    };

    GET_SINGLE_PRODUCT(id, callback, onError);
  };
  const handleSubmit = () => {
    // data.product_images = links;
    if (!data.product_images_display) {
      data.product_images = JSON.stringify(links);
    }
    data.product_price = convertPricetoNumber(data.product_price);
    data.product_retail_price = convertPricetoNumber(data.product_retail_price);
    const callback = (response) => {
      if (response) {
        setLoading(false);
        const { product_name } = response.payload;
        Swal.fire({
          title: 'Completed',
          text: response.message,
          icon: 'success',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.dismiss !== 'cancel') {
            // return router.back();
            // return router.push(`/products/${slugify(product_name)}`);
          }
        });

        router.back();
      }
      setLoading(false);
    };

    const onError = (error) => {
      setLoading(false);
      console.log(error);
    };
    let newData = {
      product_id: data.product_id,
      product_category: data.product_category,
      product_name: data.product_name,
      product_description: data.product_description,
      product_price: data.product_price,
      product_weight: data.product_weight,
      product_size: data.product_size,
      product_quantity: data.product_quantity,
      product_number: data.product_number,
      product_retail_price: data.product_retail_price,
      pickup_addreess: data.pickup_address,
      product_images: data.product_images,
      state: data.state,
      city: data.city,
    };
    UPDATE_PRODUCT(newData, callback, onError);
  };
  const cloudinaryUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'sharesell');
    try {
      axios
        .post('https://api.cloudinary.com/v1_1/aroicx/image/upload', formData)
        .then((response) => {
          if (counter < images.length) {
            counter++;
            links.push({ image: response.data.url });
          }
          if (counter === images.length) {
            setData((prevState) => ({
              ...prevState,
              product_images: JSON.stringify(links),
            }));
            setTimeout(() => {
              handleSubmit();
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFiles = (event) => {
    event.preventDefault();
    if (
      (data.product_images_display !== '' ||
        (images !== null && images.length !== 0)) &&
      inputValidatorChecker(data.product_category) &&
      inputValidatorChecker(data.product_name) &&
      inputValidatorChecker(data.product_price) &&
      inputValidatorChecker(data.product_weight) &&
      inputValidatorChecker(data.product_size) &&
      inputValidatorChecker(data.product_quantity) &&
      inputValidatorChecker(data.product_number) &&
      inputValidatorChecker(data.pickup_address) &&
      inputValidatorChecker(data.state) &&
      inputValidatorChecker(data.product_description) &&
      inputValidatorChecker(data.product_retail_price) &&
      inputValidatorChecker(data.city)
    ) {
      setLoading(true);
      if (data.product_images_display) {
        handleSubmit();
      } else {
        images.forEach((file) => {
          Swal.fire({
            text: 'Please Wait while image is uploading...',
            icon: 'warning',
            timerProgressBar: true,
            timer: 5000,
            allowOutsideClick: true,
            showConfirmButton: false,
          });
          cloudinaryUpload(file);
        });
      }
    } else {
      if (
        (images === null || images.length === 0) &&
        data.product_images_display === ''
      ) {
        setData((prev) => {
          return {
            ...prev,
            product_images_error: 'Please add images to the Upload',
          };
        });
      }
      inputValidatorErrorState(
        data.product_category,
        setData,
        'product_category_error',
        'Please Select a product category'
      );
      inputValidatorErrorState(
        data.product_name,
        setData,
        'product_name_error',
        'Product name is required'
      );
      inputValidatorErrorState(
        data.product_description,
        setData,
        'product_description_error',
        'Product Description is required'
      );
      inputValidatorErrorState(
        data.product_price,
        setData,
        'product_price_error',
        'Product Price is Required'
      );
      inputValidatorErrorState(
        data.product_weight,
        setData,
        'product_weight_error',
        'Product Weight is required'
      );
      inputValidatorErrorState(
        data.product_size,
        setData,
        'product_size_error',
        'Product Size is required'
      );
      inputValidatorErrorState(
        data.product_quantity,
        setData,
        'product_quantity_error',
        'Product Quantity is required'
      );
      inputValidatorErrorState(
        data.product_number,
        setData,
        'product_number_error',
        'Product Number is required'
      );
      inputValidatorErrorState(
        data.product_retail_price,
        setData,
        'product_retail_price_error',
        'Product retail price is required'
      );
      inputValidatorErrorState(
        data.pickup_address,
        setData,
        'pickup_address_error',
        'Pickup Address is required'
      );
      inputValidatorErrorState(
        data.state,
        setData,
        'state_error',
        'State is required'
      );
      inputValidatorErrorState(
        data.city,
        setData,
        'city_error',
        'City is required'
      );
    }
  };

  const onChangeHandler = (data, state, stateError) => {
    if (state === 'product_category') {
      setData((prevState) => ({
        ...prevState,
        product_category: selectValue(
          productCategories,
          'category_name',
          'category_id',
          data
        ),
        product_category_error: '',
        product_cateogory_display: data,
      }));
    } else if (state === 'product_price' || state === 'product_retail_price') {
      setData((prev) => {
        return {
          ...prev,
          [state]: inputFormatter(data, ',', 3),
          [stateError]: '',
        };
      });
    } else {
      setData((prev) => {
        return { ...prev, [state]: data, [stateError]: '' };
      });
    }
  };

  const setImagesHandler = (files) => {
    setImages(files);
    setData((prev) => {
      return { ...prev, product_images_error: '' };
    });
  };

  return (
    <AuthProvider className='add-product mt-4'>
      <h2 className='text-3xl font-light my-10'>Edit Product</h2>
      {loader ? (
        <div>
          <Loader />
        </div>
      ) : (
        <form onSubmit={uploadFiles}>
          <div className='m-1'>
            <Input
              label='Product Name'
              placeholder='Beanie'
              value={data.product_name}
              dispatch={(value) => {
                onChangeHandler(value, 'product_name', 'product_name_error');
              }}
              error={data.product_name_error}
            />
          </div>

          <div className='m-1'>
            <Select
              label='Product Category'
              placeholder='Select Category'
              options={selectFilter(
                productCategories,
                'category_id',
                'category_name'
              )}
              dispatch={(value) =>
                onChangeHandler(
                  value,
                  'product_category',
                  'product_category_error'
                )
              }
              initialValue={data.product_category_display}
              error={data.product_category_error}
            />
          </div>

          <div className='m-1'>
            <p>Upload product image</p>
            <span className='text-app-color text-sm'>
              Please upload 5 different views of the product
            </span>
            <DropZone
              dispatch={(files) => setImagesHandler(files)}
              error={data.product_images_error}
              initialImages={
                data.product_images_display
                  ? JSON.parse(data.product_images_display)
                  : ''
              }
              setData={setData}
            />
          </div>

          <div className='m-1 mt-8'>
            <TextArea
              label='Product Description'
              placeholder='This is like a head warmer'
              value={data.product_description}
              dispatch={(value) => {
                onChangeHandler(
                  value,
                  'product_description',
                  'product_description_error'
                );
              }}
              error={data.product_description_error}
            />
          </div>

          <div className='m-1'>
            <Input
              label='Product Price'
              placeholder='3,000'
              price={true}
              value={data.product_price}
              dispatch={(value) => {
                onChangeHandler(value, 'product_price', 'product_price_eror');
              }}
              error={data.product_price_error}
            />
          </div>

          <div className='m-1 mt-6'>
            <Input
              label='Product Weight (KG)'
              placeholder='0.5'
              value={data.product_weight}
              dispatch={(value) =>
                onChangeHandler(value, 'product_weight', 'product_weight_error')
              }
              error={data.product_weight_error}
            />
          </div>

          <div className='m-1'>
            <Select
              label='Product Size'
              placeholder='Select Size'
              options={[
                { id: 's', name: 'S' },
                { id: 'm', name: 'M' },
                { id: 'l', name: 'L' },
              ]}
              dispatch={(value) => {
                onChangeHandler(value, 'product_size', 'product_size_error');
              }}
              initialValue={data.product_size}
              error={data.product_size_error}
            />
          </div>

          <div className='m-1'>
            <Select
              label='Product Quantity'
              placeholder='Select Quantity'
              options={[
                { id: 'limited', name: 'Limited' },
                { id: 'unlimited', name: 'Unlimited' },
              ]}
              dispatch={(value) => {
                onChangeHandler(
                  value,
                  'product_quantity',
                  'product_quantity_error'
                );
              }}
              initialValue={data.product_quantity}
              error={data.product_quantity_error}
            />
          </div>

          <div className='m-1'>
            <Input
              label='Quantity Number'
              type='number'
              placeholder='20'
              value={data.product_number}
              dispatch={(value) => {
                onChangeHandler(
                  value,
                  'product_number',
                  'product_number_error'
                );
              }}
              error={data.product_number_error}
            />
          </div>

          <div className='m-1 my-5 mt-6'>
            <Input
              label='Suggested Retail Price'
              placeholder='3,000'
              price={true}
              value={data.product_retail_price}
              dispatch={(value) =>
                onChangeHandler(
                  value,
                  'product_retail_price',
                  'product_retail_price_error'
                )
              }
              error={data.product_retail_price_error}
            />
          </div>

          <div className='m-1'>
            <TextArea
              label='Pickup Address'
              placeholder='No.3 Maha Close'
              value={data.pickup_address}
              dispatch={(value) =>
                onChangeHandler(value, 'pickup_address', 'pickup_address_error')
              }
              error={data.pickup_address_error}
            />
          </div>

          <div className='m-1'>
            <Select
              label='State'
              placeholder='Select State'
              options={getStates()}
              placeholder={'Select State'}
              dispatch={(value) =>
                onChangeHandler(value, 'state', 'state_error')
              }
              error={data.state_error}
              initialValue={data.state}
            />
          </div>
          <div className='m-1'>
            <Select
              label='City'
              placeholder='Select City'
              options={getCity(data.state)}
              placeholder={'Select City'}
              dispatch={(value) => onChangeHandler(value, 'city', 'city_error')}
              error={data.city_error}
              initialValue={data.city}
            />
          </div>

          <Button
            type='submit'
            text='Save Modification'
            iconRight={'/svg/arrow-right.svg'}
            loading={loading}
          />
        </form>
      )}
    </AuthProvider>
  );
}
