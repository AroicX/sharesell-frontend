import { useGlobalStore } from '@/hooks/useGlobalStore';
import router from 'next/router';
import React, { useState } from 'react';
import { slugify } from '../helpers';
import SVG from 'react-inlinesvg';
import Modal from '@/reusable/Modal';
import Link from '@/components/Link';
import { saveAs } from 'file-saver';
import toast, { Toaster } from 'react-hot-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ProductDisplay({ product }) {
  const { role, setCurrentProduct } = useGlobalStore();
  const navigate = (product) => {
    setCurrentProduct({
      id: product.id,
      name: product.product_name,
    });

    router.push(`/products/${slugify(product.product_name)}`);
  };
  const [modal, setModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const navigateHandler = () => {
    navigate(product);
  };

  const shareHandler = (e) => {
    e.stopPropagation();
    setModal(!modal);
  };

  const downloadHandler = (e, image) => {
    e.stopPropagation();
    saveAs(image, `${product.product_name}`);
  };

  const tabToDownloadHandler = (e) => {
    e.stopPropagation();
    setModal(false);
    setDownloadModal(true);
  };

  const onCopyHandler = () => {
    setModal(false);
    toast.success('Copied to Clipboard');
  };
  return (
    <div
      className='product-display relative top-0 left-0 my-2 cursor-pointer rounded shadow-sm p-3 border border-app-text-light'
      onClick={() => navigateHandler()}
    >
      <div className='bg-black p-1 absolute top-5 right-5 rounded'>
        {role === 'Reseller' ? (
          <span className='text-white'>
            {JSON.parse(product?.product_images).length} Images
          </span>
        ) : null}
      </div>
      <div className='product-display-image'>
        <img
          className='w-full flex center text-center items-center justify-center '
          src={
            JSON.parse(product?.product_images)[
              Math.floor(Math.random() * 5) + 1
            ]?.image
          }
        />
      </div>
      <Toaster />
      {role === 'Supplier' ? (
        <div className='flex justify-between'>
          <div className='flex flex-col my-2 mt-10'>
            <p>{product.product_name}</p>
            <span className='text-3xl font-bold'>
              ₦{product.product_price?.toLocaleString()}
            </span>
          </div>
          <div
            onClick={() => navigate(product)}
            className='text-app-text-light my-auto'
          >
            View Product
          </div>
        </div>
      ) : null}
      {role === 'Reseller' ? (
        <div>
          <p className='text-black font-medium text-lg'>
            {product.product_name}
          </p>
          <div className='flex justify-between'>
            <div className='flex flex-col my-2 '>
              <p className='text-app-text-light text-sm'>STARTING FROM</p>
              <span className='text-3xl font-bold'>
                ₦{product.product_price?.toLocaleString()}
              </span>
              <span className='text-app-text-light font-thin line-through text-sm'>
                ₦
                {parseInt(product.product_price) +
                  Math.floor(Math.random(500, 20000))}{' '}
                (50% off)
              </span>
            </div>
            <button
              onClick={(e) => shareHandler(e)}
              className='flex bg-gray-200 text-sm p-2 my-auto rounded-full'
            >
              <SVG className='mx-2 my-auto' src='/svg/share.svg' />
              Share Product
            </button>
          </div>
        </div>
      ) : null}
      <Modal
        title={'Share Product Details'}
        toggle={modal}
        dispatch={() => setModal(false)}
      >
        <div className='w-full'>
          <div className='flex items-center justify-between p-2 bg-app-cream rounded-3xl max-w-max'>
            <p className='text-pry-black font-medium text-sm ml-1'>1.</p>
            <SVG src='/svg/download-icon.svg' className='mx-3' />
            <p
              className='text-pry-black font-medium text-sm ml-1'
              onClick={(e) => tabToDownloadHandler(e)}
            >
              Tap to Download Images
            </p>
          </div>
          <div
            className='flex items-center justify-between p-2 bg-app-cream rounded-3xl max-w-max mt-3'
            onClick={(e) => e.stopPropagation()}
          >
            <p className='text-pry-black font-medium text-sm ml-1'>2.</p>
            <SVG src='/svg/clipboard-icon.svg' className='mx-3' />
            <CopyToClipboard
              text={product.product_description}
              onCopy={() => onCopyHandler()}
            >
              <p className='text-pry-black font-medium text-sm ml-1'>
                Tap to Copy Product Details
              </p>
            </CopyToClipboard>
          </div>
          <span className='w-full text-app-text font-medium float-left text-md my-2'>
            Share on:
          </span>
          <div className='w-full flex mt-10'>
            <Link
              className='mx-2'
              to={`https://twitter.com/intent/tweet?url`}
              target='_blank'
            >
              <SVG className='my-auto mx-2' src='/svg/whatsapp.svg' />
            </Link>
            <Link
              className='mx-2'
              to={`https://www.facebook.com/sharer/sharer.php?u`}
              target='_blank'
            >
              <SVG className='my-auto mx-2' src='/svg/facebook.svg' />
            </Link>
            <Link
              className='mx-2'
              to={`https://twitter.com/intent/tweet?url`}
              target='_blank'
            >
              <SVG className='my-auto mx-2' src='/svg/twitter.svg' />
            </Link>
          </div>
        </div>
      </Modal>
      <Modal
        title={'Download Product Image'}
        toggle={downloadModal}
        dispatch={() => setDownloadModal(false)}
      >
        <div>
          {product &&
            JSON.parse(product.product_images).map((image, index) => (
              <div
                key={index}
                className='flex justify-between items-center mt-2'
              >
                <div className='flex items-center text-sm'>
                  <p className='mr-2 text-sm'>{index + 1}.</p>
                  <p>
                    {product.product_name} {index + 1}
                  </p>
                </div>
                <div>
                  <button
                    className='bg-app-cream p-2 fle rounded text-xs'
                    onClick={(e) => downloadHandler(e, image.image)}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}
