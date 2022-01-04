import React from 'react';
import AppHeader from '@/components/AppHeader';

export default function Legal() {
  return (
    <div className='mt-4'>
      <AppHeader noSVG styles='py-5' />
      <div className='mt-20'>
        <h2 className='font-medium text-2xl text-pry-black my-4'>
          Legal Agreements
        </h2>
        <div className='mt-7'>
          <p className='text-sm text-app-text text-justify'>
            RemixIcon is maintained by Remix Design. We are a small group of
            people focused part-time on open-source projects with enthusiasm.
            Feel free to contact us.
          </p>
          <p className='text-sm text-app-text text-justify mt-8'>
            I’ve started learning ASL, but I find reading it almost impossible,
            because it’s so fast. I made this app to practice reading
            fingerspelling at different speeds!
          </p>
        </div>
      </div>
    </div>
  );
}
