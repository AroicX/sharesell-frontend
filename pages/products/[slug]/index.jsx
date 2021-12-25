import AppHeader from '@/components/AppHeader';
import ImageModal from '@/components/ImageModal';
import React from 'react';
import SVG from 'react-inlinesvg';

export default function ProductSlug() {
  return (
    <div className='product-slug'>
      <AppHeader edit='Edit Product' />

      <h3 className='text-3xl mt-5'>Product Details</h3>
      <div className='w-full flex flex-col mt-5'>
        <p className='text-app-text'>Product Name</p>
        <ImageModal />

        <div className='flex flex-col my-3 p-2'>
          <span className='text-app-color font-medium'>Product Details</span>
          <p>
            To answer our questions, we made some strategic choices. Firstly, we
            chose to retain the main brand colour – tweaking it just a little –
            and add a few supplementary colours so the overall scheme is
            stronger, more consistent, and distinct.
          </p>
        </div>
        <div className='flex justify-between p-2'>
          <div className='flex flex-col '>
            <p className='text-app-color'>Weight</p>
            <span className='font-light'>1KG</span>
          </div>
          <div className='flex flex-col '>
            <p className='text-app-color'>Size</p>
            <span className='font-light'>L</span>
          </div>
          <div className='flex flex-col '>
            <p className='text-app-color'>Stock Left</p>
            <span className='font-light'>10</span>
          </div>
        </div>
        <div className='flex  p-2'>
          <div className='flex flex-col '>
            <p className='text-app-color'>Product Price</p>
            <span className='font-light'>N3,000</span>
          </div>
          <div className='flex flex-col mx-5'>
            <p className='text-app-color'>Suggested Retail Price</p>
            <span className='font-light'>N3,000</span>
          </div>
        </div>

        {/* <Button
          iconLeft='/svg/delete-bin.svg'
          text='Delete'
          styles='w-44 bg-red-50 text-red-500'
        /> */}
        <div className='w-full flex center items-center justify-center mt-10 pb-52'>
          <button className='flex bg-red-50 p-3 px-7 rounded transition-all hover:bg-red-200'>
            <span className='text-red-500 m-auto'>Delete</span>
            <SVG
              className='text-red-500 m-auto mx-1'
              src='/svg/delete-bin.svg'
            />
          </button>
        </div>
      </div>
    </div>
  );
}
