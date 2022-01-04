import React from 'react';
import AppHeader from '@/components/AppHeader';
import Accourdion from '../Accordion';

export default function FAQ() {
  const faqs = [
    {
      question: 'This is a question that spans just two lines on the screen',
      answer:
        'I’ve started learning ASL, but I find reading it almost impossible, because it’s so fast. I made this app to practice reading fingerspelling at different speeds!',
      image: '/images/faq-bag.png',
    },
    {
      question: 'This is a question that spans just two lines on the screen',
      answer:
        'I’ve started learning ASL, but I find reading it almost impossible, because it’s so fast. I made this app to practice reading fingerspelling at different speeds!',
      image: '/images/faq-bag.png',
    },
    {
      question: 'This is a question that spans just two lines on the screen',
      answer:
        'I’ve started learning ASL, but I find reading it almost impossible, because it’s so fast. I made this app to practice reading fingerspelling at different speeds!',
      image: '/images/faq-bag.png',
    },
    {
      question: 'This is a question that spans just two lines on the screen',
      answer:
        'I’ve started learning ASL, but I find reading it almost impossible, because it’s so fast. I made this app to practice reading fingerspelling at different speeds!',
      image: '/images/faq-bag.png',
    },
  ];
  return (
    <div className='mt-4'>
      <AppHeader noSVG styles='py-5' />
      <div className='mt-20'>
        <h2 className='font-medium text-2xl text-pry-black my-4'>
          How To (FAQ)
        </h2>
        <div className='mt-10'>
          {faqs.map((faq, index) => (
            <Accourdion key={index} faq={faq} />
          ))}
        </div>
      </div>
    </div>
  );
}
