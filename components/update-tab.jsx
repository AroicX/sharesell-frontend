import React from 'react';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';

export default function UpdateTab({ detail }) {
  const Router = useRouter();
  return (
    <div
      className={`flex p-4 py-10 rounded cursor-pointer my-2 ${
        detail.isComplete ? 'bg-lightest-green' : 'bg-app-cream'
      }`}
      onClick={() => Router.push(detail.to)}
    >
      <div className='update-tab-icon mr-3'>
        <SVG
          src={`${
            detail.isComplete ? detail.completeIcon : detail.inCompleteIcon
          }`}
        />
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex flex-col'>
          <p className='font-semibold text-sm text-pry-black'>{detail.title}</p>
          <p
            className={`text-xs ${
              detail.isComplete ? 'text-green' : 'text-app-text'
            }`}
          >
            {detail.info}
          </p>
        </div>
        <div className='flex justify-between items-center mt-3'>
          <p
            className={`font-semibold text-xs ${
              detail.isComplete ? 'text-green' : 'text-app-color'
            }`}
          >{`${detail.progress} complete`}</p>
          {detail.isComplete && detail.title === 'BVN' ? (
            ''
          ) : (
            <div className='flex items-center'>
              <p
                className={`font-medium text-xs mr-4 ${
                  detail.isComplete ? 'text-pty-black' : 'text-app-text'
                }`}
              >
                Update
              </p>
              <SVG
                src={`${
                  detail.isComplete
                    ? '/svg/arrow-black.svg'
                    : '/svg/arrow-brown.svg'
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
