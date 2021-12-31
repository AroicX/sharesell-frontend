import React from 'react';
import AppHeader from '@/components/AppHeader';
import SVG from 'react-inlinesvg';

export default function About() {
  return (
    <div className='mt-4'>
      <AppHeader noSVG />
      <div>
        <h2 className='font-medium text-2xl text-pry-black my-4'>About</h2>
        <SVG src='/svg/dark-logo.svg'/>
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