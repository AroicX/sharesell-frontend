import React from 'react';
import AppHeader from 'components/AppHeader';
import Input from 'reusable/Input';
import Button from 'reusable/Button';
import { useRouter} from "next/router"

export default function ChangePassword() {
    const Router = useRouter();
  return (
    <div className='mt-4'>
      <AppHeader noSVG />
      <div className=''>
        <h2 className='text-3xl font-light my-4'>Change Password</h2>
        <div className='mt-10'>
            <div className='mb-8'>
                <Input type='password' label={"Current Password"} placeholder={"Current Password"}/>
            </div>
            <div className='mb-8'>
                <Input type='password' label={"New Password"} placeholder={"New Password"}/>
            </div>
            <div className='mb-8'>
                <Input type='password' label={"Retype New Password"} placeholder={"Retype Password"}/>
            </div>
            <Button text={"Save Changes"} iconRight={"/svg/arrow-right.svg"} click={() => Router.back()}/>
        </div>
      </div>
    </div>
  );
}
