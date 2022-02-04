import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import SVG from 'react-inlinesvg';

export default function Dropzone({
  dispatch,
  styles,
  rest,
  error,
  initialImages,
  setData,
}) {
  const initialImageConverter = (images) => {
    let convertedImages = [];
    images.forEach((image, index) =>
      convertedImages.push({ name: index, value: image.image })
    );

    return convertedImages;
  };
  const [files, setFiles] = useState(
    initialImages ? initialImageConverter(initialImages) : null
  );
  const [imagePreview, setImagePreview] = useState(
    initialImages ? initialImageConverter(initialImages) : null
  );
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    let parent = document.getElementById('image-grid');
    let _images = [];

    setFiles(acceptedFiles);
    acceptedFiles.forEach((key, i) => {
      _images.push({
        name: key.name,
        value: window.URL.createObjectURL(key),
      });

      setTimeout(() => {
        setImagePreview(_images);
        window.scrollBy(0, 50);
        parent.click();
      }, 100);
    });
    if (setData) {
      setData((prev) => ({ ...prev, product_images_display: '' }));
    }
    dispatch(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const remove = (data) => {
    let arr = [];
    let arrPreview = [];
    files.filter((file) => {
      if (file.name !== data.name) {
        arr.push(file);
      }
    });
    imagePreview.filter((file) => {
      if (file.name !== data.name) {
        arrPreview.push(file);
      }
    });
    if (setData) {
      console.log('BAD');
      setData((prev) => ({ ...prev, product_images_display: '' }));
    }
    setFiles(arr);
    setImagePreview(arrPreview);
    dispatch(arr);
  };

  return (
    <>
      {/* image-preview */}
      <div
        className='flex flex-wrap justify-evenly gap-x-5 gap-y-8 mt-2 overflow-y-scroll'
        style={{
          maxHeight: '200px',
        }}
        id='image-grid'
      >
        {imagePreview?.map((img, i) => (
          <div className='relative m-auto' key={i + 1}>
            <img width='100px' height='100px' src={img.value} alt='*' />
            <img
              onClick={() => remove(img)}
              className='absolute top-0 right-0 cursor-pointer '
              src='/svg/cancel.svg'
              alt='*'
            />
          </div>
        ))}
      </div>
      {/* image-preview */}
      <div
        className={`bg-app-cream  p-5 rounded border border-dashed my-2 border-app-color cursor-pointer ${styles}`}
        {...rest}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className='flex flex-col text-center justify-center items-center'>
            <SVG className='my-5' src='/svg/upload.svg' />
            <p className='font-bold '>Drop the files here ...</p>
          </div>
        ) : (
          <div className='flex flex-col text-center justify-center items-center'>
            <SVG className='my-5' src='/svg/upload.svg' />
            <p className='font-bold '>
              {' '}
              <span className='text-app-color'>Tap here</span> to select a file
              <br />
              from your device
            </p>
          </div>
        )}
      </div>
      {error && (
        <div className='mt-4 w-full'>
          <span className='text-red-500 text-sm bg-red-200 p-4 rounded my-1 w-full'>
            {error}
          </span>
        </div>
      )}
    </>
  );
}
