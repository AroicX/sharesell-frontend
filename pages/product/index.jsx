import React from 'react';
import useAuth from 'hooks/useAuth';
import Button from 'reusable/Button';

const Product = ({}) => {
  return (
    <div className='Product'>
      <h3>Product</h3>
      <Button text='Add Product' styles='block w-12' to="/product/add-product" />
    </div>
  );
};

export default useAuth(Product);
