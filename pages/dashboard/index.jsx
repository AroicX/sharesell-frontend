import React, { useEffect, useState } from 'react';

import Layout from '@/components/layout';
import Link from '@/components/Link';
import ProductDisplay from '@/components/ProductDisplay';
import WithdrawalDisplay from '@/components/WithdrawalDisplay';
import AuthProvider from '@/components/AuthProvider';
import { useGlobalStore } from '@/hooks/useGlobalStore';
import { getInitials, slugify } from '@/helpers/index';
import { _protectedRequest } from 'services';
import useSWR from 'swr';
import SearchBar from '@/components/SearchBar';
import Tag from '@/components/Tag';
import { useRouter } from 'next/router';
import { SEARCH_PRODUCT } from '@/services/products';
import Loader from '@/reusable/Loader';
import Button from '@/reusable/Button';

export default function Dashboard() {
  const {
    products,
    user,
    role,
    setProductCategories,
    setCurrentCategory,
    favourite,
  } = useGlobalStore();

  const [search, setSearch] = useState({
    value: '',
    isLoading: false,
    isActive: false,
    searchResult: [],
  });

  const { data, error } = useSWR(`/products/categories`, _protectedRequest);
  const categories = data?.payload?.data || [];
  const Router = useRouter();
  const navigate = (category) => {
    setCurrentCategory({
      id: category.category_id,
      name: category.category_name,
    });

    Router.push(`/products/category/${slugify(category.category_name)}`);
  };

  useEffect(() => {
    if (categories.length > 0) {
      setProductCategories(categories);
    }
  }, [categories]);

  const onSearch = (event) => {
    event.preventDefault();
    if (search.value !== '') {
      setSearch((prev) => ({ ...prev, isLoading: true, isActive: true }));
      const callback = (response) => {
        setSearch((prev) => ({
          ...prev,
          searchResult: response.payload,
          isLoading: false,
        }));
      };
      const onError = (err) => {
        console.log(err);
        setSearch((prev) => ({ ...prev, isLoading: false }));
      };

      SEARCH_PRODUCT(search.value, callback, onError);
    }
  };

  const closeSearchHandler = () => {
    setSearch((prev) => ({ ...prev, isActive: false }));
  };

  return (
    <AuthProvider>
      <Layout>
        <div className='w-full bg-white p-2 flex justify-between fixed top-0 left-0 z-50 shadow'>
          {/* <img
            className='border-50  '
            src='/images/Image.png'
            alt='image'
            width='50px'
            height='50px'
          /> */}
          <div className='profile-image-container flex items-center justify-center h-10 w-10 rounded-full relative cursor-pointer'>
            <p className='font-medium text-xs text-app-cream'>
              {getInitials(user?.[role.toLowerCase()]?.business_name)}
            </p>
          </div>
          <Link to='/profile/update-account' className='text-app-color m-auto'>
            Hi, Tap here to update account
          </Link>
          <Link to='/notification' className='relative my-auto'>
            <div className=' absolute -top-1 -right-1 z-10 bg-terms p-1 rounded-full border-2 border-white '></div>
            <button className='relative px-2 block my-auto bg-terms text-white rounded'>
              0
            </button>
          </Link>
        </div>
        <div className='mt-14'>
          {role === 'Supplier' && <WithdrawalDisplay />}
          {role === 'Reseller' && (
            <SearchBar
              dispatch={(data) =>
                setSearch((prev) => ({ ...prev, value: data }))
              }
              handleSubmit={onSearch}
            />
          )}
          {role === 'Reseller' && (
            <div className='flex overflow-x-auto'>
              {categories.map((category) => (
                <Tag
                  key={category.id}
                  tag={category}
                  click={() => navigate(category)}
                />
              ))}
            </div>
          )}
          {search.isActive === false && (
            <div className='flex justify-between'>
              <span className='text-app-text font-medium'>Recent Products</span>
              <Link to='/products' className='text-app-color text-sm my-auto'>
                See All
              </Link>
            </div>
          )}
          {search.isActive && search.isLoading === false && (
            <div className='flex justify-between'>
              <span className='text-app-text font-medium'>{`${search.searchResult.length} Product Found`}</span>
              <p
                to='/products'
                className='text-app-color text-sm my-auto cursor-pointer'
                onClick={() => closeSearchHandler()}
              >
                Close Search
              </p>
            </div>
          )}
        </div>
        {search.isLoading && (
          <div className='mt-10'>
            <Loader />
          </div>
        )}
        {search.isActive === false && (
          <div className={`${role === 'Supplier' ? 'mb-16' : ''}`}>
            {products.length > 0 ? (
              products?.map((item, i) => (
                <ProductDisplay
                  key={i + 1}
                  product={item}
                  favourite={favourite[item.id] ? true : false}
                />
              ))
            ) : (
              <div className='w-full bg-app-cream p-3 rounded mt-5 text-center shadow-sm'>
                <span className='text-app-color'>No Product Found</span>
              </div>
            )}
          </div>
        )}
        {search.isActive && search.isLoading === false && (
          <div>
            {search.searchResult.length > 0 ? (
              search.searchResult?.map((item, i) => (
                <ProductDisplay key={i + 1} product={item} />
              ))
            ) : (
              <div className='w-full bg-app-cream p-3 rounded mt-5 text-center shadow-sm'>
                <span className='text-app-color'>No Product Found</span>
              </div>
            )}
          </div>
        )}
        {role === 'Supplier' && (
          <div>
            <Button
              iconLeft='/svg/plus-icon.svg'
              text='Add Product'
              styles='fixed bottom-20 right-2 block w-12 bg-black rounded-full w-44 z-50'
              to='/products/add-product'
              style={{ background: '#000' }}
            />
          </div>
        )}
        {/* {[...Array(20)].map((item, i) => (
          <ProductDisplay key={i + 1} />
        ))} */}
      </Layout>
    </AuthProvider>
  );
}
