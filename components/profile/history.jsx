import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import SVG from 'react-inlinesvg';
import HistoryTab from '@/components/HistoryTab';

export default function History() {
  const transactions = [
    {
      title: 'Withdrawal to Osamudiamen GTB',
      date: 'Aug 28th 2020',
      price: '₦20,000',
      type: 'widthdraw',
    },
    {
      title: 'Deposit from ShareSell',
      date: 'Aug 28th 2020',
      price: '₦20,000',
      type: 'deposit',
    },
    {
      title: 'Withdrawal to Osamudiamen GTB',
      date: 'Aug 28th 2020',
      price: '₦20,000',
      type: 'widthdraw',
    },
    {
      title: 'Withdrawal to Osamudiamen GTB',
      date: 'Aug 28th 2020',
      price: '₦20,000',
      type: 'widthdraw',
    },
  ];

  const Orders = [
    {
      title: 'Yellow Sundress',
      date: 'Aug 28th 2020',
      price: '₦20,000',
      type: 'deposit',
    },
    {
      title: 'Yellow Sundress',
      date: 'Aug 28th 2020',
      price: '₦20,000',
      type: 'deposit',
    },
    {
      title: 'Yellow Sundress',
      date: 'Aug 28th 2020',
      price: '₦20,000',
      type: 'deposit',
    },
    {
      title: 'Yellow Sundress',
      date: 'Aug 28th 2020',
      price: '₦20,000',
      type: 'deposit',
    },
    {
      title: 'Yellow Sundress',
      date: 'Aug 28th 2020',
      price: '₦20,000',
      type: 'deposit',
    },
  ];
  const [currentHistory, setCurrentHistory] = useState('transactions');
  return (
    <div className='mt-4'>
      <AppHeader noSVG styles='py-5' />
      <div className='mt-20'>
        <h2 className='text-3xl font-light my-4'>History</h2>
        <div>
          <div className='flex mt-8 bg-white'>
            <div
              className='flex w-full items-center justify-center cursor-pointer'
              onClick={() => setCurrentHistory('transactions')}
            >
              <p
                className={`font-medium text-base px-4 py-1 border-app-text ${
                  currentHistory === 'transactions'
                    ? 'border-b-2 text-app-text '
                    : 'text-app-color'
                }`}
              >
                Transactions
              </p>
            </div>
            <div
              className='flex w-full items-center justify-center cursor-pointer'
              onClick={() => setCurrentHistory('orders')}
            >
              <p
                className={`font-medium text-base px-4 py-1 border-app-text ${
                  currentHistory === 'orders'
                    ? 'border-b-2 text-app-text '
                    : 'text-app-color'
                }`}
              >
                Orders
              </p>
            </div>
          </div>
          <div className='history-content'>
            <div className='pt-10'>
              <h3 className='font-bold text-base text-app-text'>August</h3>
              <div className='flex items-center justify-between py-2 mb-2 border-b border-app-text'>
                <p className='font-medium text-sm text-app-text'>Week 4</p>
                <div className='flex items-center'>
                  <p className='font-medium text-sm text-app-text mr-1'>Open</p>{' '}
                  <SVG src='/svg/plus.svg' />
                </div>
              </div>
              <div>
                <div className='flex items-center justify-between mb-4 py-2 border-b border-app-color'>
                  <p className='font-medium text-sm text-app-color'>Week 3</p>
                  <div className='flex items-center'>
                    <p className='font-medium text-sm text-app-color mr-1'>
                      Close
                    </p>{' '}
                    <SVG src='/svg/close.svg' />
                  </div>
                </div>
                {currentHistory === 'transactions' ? (
                  <div>
                    {transactions.map((history, index) => (
                      <HistoryTab
                        key={index}
                        history={history}
                        currentHistory={currentHistory}
                      />
                    ))}
                  </div>
                ) : (
                  ''
                )}
                {currentHistory === 'orders' ? (
                  <div>
                    {Orders.map((history, index) => (
                      <HistoryTab
                        key={index}
                        history={history}
                        currentHistory={currentHistory}
                      />
                    ))}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className='flex items-center justify-between py-2 mb-2 border-b border-app-text'>
                <p className='font-medium text-sm text-app-text'>Week 2</p>
                <div className='flex items-center'>
                  <p className='font-medium text-sm text-app-text mr-1'>Open</p>{' '}
                  <SVG src='/svg/plus.svg' />
                </div>
              </div>
              <div className='flex items-center justify-between py-2 mb-2 border-b border-app-text'>
                <p className='font-medium text-sm text-app-text'>Week 1</p>
                <div className='flex items-center'>
                  <p className='font-medium text-sm text-app-text mr-1'>Open</p>{' '}
                  <SVG src='/svg/plus.svg' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
