import React from 'react';
import useAuth from 'hooks/useAuth';
import AppHeader from 'components/AppHeader';
import Input from 'reusable/Input';
import Select from 'reusable/Select';
import TextArea from 'reusable/TextArea';
import Infocard from 'reusable/Infocard';
import DropZone from 'reusable/DropZone';
import Button from 'reusable/Button';

const AddProduct = ({}) => {
  return (
    <div className='add-product'>
      <AppHeader />
      <h2 className='text-3xl font-light my-10'>Add a New Product</h2>

      <div className='m-1'>
        <Input label='Product Name' placeholder='Beanie' />
      </div>

      <div className='m-1'>
        <Select
          label='Product Category'
          placeholder='Select Category'
          options={['Shoes', 'Bags', 'Boys Clothes', 'Girls Clothes', 'Wigs']}
          dispatch={(data) => console.log(data)}
        />
      </div>

      <div className='m-1'>
        <p>Upload product image</p>
        <span className='text-app-color text-sm'>
          Please upload 5 different views of the product
        </span>
        <DropZone dispatch={(files) => console.log(files)} />
      </div>

      <div className='m-1'>
        <TextArea
          label='Product Description'
          placeholder='This is like a head warmer'
        />
      </div>

      <div className='m-1'>
        <Input
          label='Product Price'
          type='number'
          placeholder='3,000'
          price={true}
        />
      </div>

      <div className='m-1 my-5'>
        <Infocard
          icon='/svg/warning.svg'
          text='Remember to keep the Product Price as  attractive as possible for our Resellers. Attractive prices lead to more sales.'
        />
      </div>

      <div className='m-1'>
        <Input label='Product Weight (KG)' placeholder='0.5' />
      </div>

      <div className='m-1'>
        <Select
          label='Product Size'
          placeholder='Select Size'
          options={['All Sizes', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
          dispatch={(data) => console.log(data)}
        />
      </div>

      <div className='m-1'>
        <Select
          label='Product Quantity'
          placeholder='Select Quantity'
          options={['Limited', 'Unlimited']}
          dispatch={(data) => console.log(data)}
        />
      </div>

      <div className='m-1'>
        <Input label='Quantity Number' type='number' placeholder='20' />
      </div>

      <div className='m-1 my-5'>
        <Input
          label='Suggested Retail Price'
          type='number'
          placeholder='3,000'
          price={true}
        />
      </div>

      <div className='m-1'>
        <TextArea label='Pickup Address' placeholder='No.3 Maha Close' />
      </div>

      <div className='m-1'>
        <Select
          label='State'
          placeholder='Select State'
          options={['Shoes', 'Bags', 'Boys Clothes', 'Girls Clothes', 'Wigs']}
          dispatch={(data) => console.log(data)}
        />
      </div>
      <div className='m-1'>
        <Select
          label='City'
          placeholder='Select City'
          options={['Shoes', 'Bags', 'Boys Clothes', 'Girls Clothes', 'Wigs']}
          dispatch={(data) => console.log(data)}
        />
      </div>

      <Button text='Save Product' iconRight={'/svg/arrow-right.svg'} />
    </div>
  );
};

export default useAuth(AddProduct);
