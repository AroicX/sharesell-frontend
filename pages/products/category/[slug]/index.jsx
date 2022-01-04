import AppHeader from '@/components/AppHeader';
import AuthProvider from '@/components/AuthProvider';
import ProductDisplay from '@/components/ProductDisplay';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { GET_PRODUCTS_IN_CATEGORIES } from '@/services/products';
import React, { useEffect, useState } from 'react';
import router from 'next/router';

export default function ProductCategory({}) {
  const { productCategories, currentCategory } = useGlobalStore();

  const [categoryName, setCategoryName] = useState(
    currentCategory?.name || null
  );
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (productCategories.length < 1) {
      router.push('/products');
    } else {
      getProducts(currentCategory.id);
    }
  }, [productCategories]);

  const getProducts = (id) => {
    const callback = (response) => {
      const { products } = response?.payload?.data[0];

      setProducts(products);
    };
    const onError = (error) => {
      console.log(error);
    };
    GET_PRODUCTS_IN_CATEGORIES(id, callback, onError);
  };
  return (
    <AuthProvider>
      <AppHeader />
      <div className='product-category'>
        <h3 className='text-3xl mt-20'>{categoryName?.toLocaleUpperCase()}</h3>

        {products.length > 0 ? (
          products?.map((item, i) => (
            <ProductDisplay key={i + 1} product={item} />
          ))
        ) : (
          <div className='w-full bg-app-cream p-3 rounded mt-5 text-center shadow-sm'>
            <span className='text-app-color'>No Product Found</span>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}
