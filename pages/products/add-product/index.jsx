import React, { useState, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import Input from '@/reusable/Input';
import Select from '@/reusable/Select';
import TextArea from '@/reusable/TextArea';
import Infocard from '@/reusable/Infocard';
import DropZone from '@/reusable/DropZone';
import Button from '@/reusable/Button';
import AuthProvider from '@/components/AuthProvider';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import router from 'next/router';
import { selectFilter, selectValue } from '@/helpers/index';
import axios from 'axios';
import Swal from 'sweetalert2';

let counter = 0;
let links = [];
export default function AddProduct({}) {
  const { productCategories } = useGlobalStore();

  useEffect(() => {
    if (productCategories.length < 1) {
      router.push('/products');
    }
  }, [productCategories]);

  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    user_id: '',
    product_name: 'Beanie',
    product_category: '',
    product_description: 'This is a head warmer.',
    product_price: 3000,
    product_weight: 0.5,
    product_size: 'L',
    product_quantity: 'Limited',
    product_number: 20,
    product_retail_price: 4000,
    pickup_address: 'No 4 Maha close, Barnawa Kaduna',
    state: 'Kaduna',
    city: 'Kaduna',
    product_images: [],
  });

  const handleUpload = (event) => {
    event.preventDefault();

    console.log(uploadFiles(images));
    // Swal.fire({
    //   text: response.message,
    //   icon: 'success',
    //   timerProgressBar: true,
    //   timer: 2000,
    //   allowOutsideClick: true,
    //   showConfirmButton: false,
    // });
  };

  const uploadFiles = (event) => {
    event.preventDefault();
    setLoading(true);
    Swal.fire({
      text: 'Please Wait while image is uploading...',
      icon: 'warning',
      timerProgressBar: true,
      timer: 5000,
      allowOutsideClick: true,
      showConfirmButton: false,
    });
    images.forEach((file) => {
      cloudinaryUpload(file);
    });
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
            links.push(response.data.url);
          }
          if (counter === images.length) {
            setData((prevState) => ({ ...prevState, product_images: links }));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthProvider className='add-product'>
      <AppHeader />
      <h2 className='text-3xl font-light my-10'>Add a New Product</h2>
      <form onSubmit={uploadFiles}>
        <div className='m-1'>
          <Input
            label='Product Name'
            placeholder='Beanie'
            value={data.product_name}
            dispatch={(value) =>
              setData((prevState) => ({
                ...prevState,
                product_name: value,
              }))
            }
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
              setData((prevState) => ({
                ...prevState,
                product_category: selectValue(
                  productCategories,
                  'category_name',
                  'category_id',
                  value
                ),
              }))
            }
          />
        </div>

        <div className='m-1'>
          <p>Upload product image</p>
          <span className='text-app-color text-sm'>
            Please upload 5 different views of the product
          </span>
          <DropZone dispatch={(files) => setImages(files)} />
        </div>

        <div className='m-1'>
          <TextArea
            label='Product Description'
            placeholder='This is like a head warmer'
            value={data.product_description}
            dispatch={(value) =>
              setData((prevState) => ({
                ...prevState,
                product_description: value,
              }))
            }
          />
        </div>

        <div className='m-1'>
          <Input
            label='Product Price'
            type='number'
            placeholder='3,000'
            price={true}
            value={data.product_price}
            dispatch={(value) =>
              setData((prevState) => ({
                ...prevState,
                product_price: value,
              }))
            }
          />
        </div>

        <div className='m-1 my-5'>
          <Infocard
            icon='/svg/warning.svg'
            text='Remember to keep the Product Price as  attractive as possible for our Resellers. Attractive prices lead to more sales.'
          />
        </div>

        <div className='m-1'>
          <Input
            label='Product Weight (KG)'
            placeholder='0.5'
            value={data.product_weight}
            dispatch={(value) =>
              setData((prevState) => ({
                ...prevState,
                product_weight: value,
              }))
            }
          />
        </div>

        <div className='m-1'>
          <Select
            label='Product Size'
            placeholder='Select Size'
            options={['All Sizes', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
            placeholder={data.product_size}
            dispatch={(value) =>
              setData((prevState) => ({
                ...prevState,
                product_size: value,
              }))
            }
          />
        </div>

        <div className='m-1'>
          <Select
            label='Product Quantity'
            placeholder='Select Quantity'
            options={['Limited', 'Unlimited']}
            placeholder={data.product_quantity}
            dispatch={(value) =>
              setData((prevState) => ({
                ...prevState,
                product_quantity: value,
              }))
            }
          />
        </div>

        <div className='m-1'>
          <Input
            label='Quantity Number'
            type='number'
            placeholder='20'
            value={data.product_number}
            dispatch={(value) =>
              setData((prevState) => ({
                ...prevState,
                product_number: value,
              }))
            }
          />
        </div>

        <div className='m-1 my-5'>
          <Input
            label='Suggested Retail Price'
            type='number'
            placeholder='3,000'
            price={true}
            value={data.product_retail_price}
            dispatch={(value) =>
              setData((prevState) => ({
                ...prevState,
                product_retail_price: value,
              }))
            }
          />
        </div>

        <div className='m-1'>
          <TextArea
            label='Pickup Address'
            placeholder='No.3 Maha Close'
            value={data.pickup_address}
            dispatch={(value) =>
              setData((prevState) => ({
                ...prevState,
                pickup_address: value,
              }))
            }
          />
        </div>

        <div className='m-1'>
          <Select
            label='State'
            placeholder='Select State'
            options={['Shoes', 'Bags', 'Boys Clothes', 'Girls Clothes', 'Wigs']}
            placeholder={data.state}
            dispatch={(value) =>
              setData((prevState) => ({
                ...prevState,
                state: value,
              }))
            }
          />
        </div>
        <div className='m-1'>
          <Select
            label='City'
            placeholder='Select City'
            options={['Shoes', 'Bags', 'Boys Clothes', 'Girls Clothes', 'Wigs']}
            placeholder={data.city}
            dispatch={(value) =>
              setData((prevState) => ({
                ...prevState,
                city: value,
              }))
            }
          />
        </div>

        <Button
          type='submit'
          text='Save Product'
          iconRight={'/svg/arrow-right.svg'}
          loading={loading}
        />
      </form>
    </AuthProvider>
  );
}
