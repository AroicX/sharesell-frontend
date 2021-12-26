import React from 'react';
import SVG from 'react-inlinesvg';

export default function HistoryTab({ history, currentHistory }) {
  return (
    <div className='w-full flex history-tab rounded p-3 my-2 bg-white'>
      <div className='h-10 flex rounded-full justify-center items-center history-icon-container mr-4'>
        {currentHistory === 'orders' ? <SVG src={'/svg/cart.svg'} /> : ''}
        {currentHistory === 'transactions' ? (
          <SVG
            src={`${
              history.type === 'deposit'
                ? '/svg/deposit.svg'
                : '/svg/widthdraw.svg'
            }`}
          />
        ) : (
          ''
        )}
      </div>
      <div className='flex justify-between w-full'>
        <div className='flex flex-col'>
          <p className='text-sm font-semibold text-pry-black history-title'>
            {history.title}
          </p>
          <p className='history-date font-medium'>{history.date}</p>
        </div>
        {currentHistory === 'orders' ? (
          <p className='font-semibold text-sm text-green'>{history.price}</p>
        ) : (
          ''
        )}
        {currentHistory === 'transactions' ? (
          <p
            className={`font-semibold text-sm ${
              history.type === 'deposit' ? 'text-green' : 'text-app-text'
            }`}
          >
            {`${history.type === "deposit" ? "+" : ""}${history.price}`}
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
