import React, { Component } from 'react';
import Button from '@/reusable/Button';
import Infocard from '@/reusable/Infocard';
import Input from '@/reusable/Input';
import Select from '@/reusable/Select';
import DropZone from '@/reusable/DropZone';
import Swal from 'sweetalert2';
import SVG from 'react-inlinesvg';
import AppHeader from '@/components/AppHeader';
import MoreMenu from '@/components/MoreMenu';
import Modal from '@/reusable/Modal';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className='p-3 text-app-text'>
          {/* <DropZone />
          <MoreMenu /> */}
          {/* <AppHeader /> */}
          <Modal />
          <SVG width='200px' src={'/svg/logo.svg'} />

          <Button
            text='This Button fires Sweet Alert'
            click={() =>
              Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool',
              })
            }
          />
          <Infocard
            icon='/svg/warning.svg'
            text='Remember to keep the Product Price as 
attractive as possible for our Resellers. 
Attractive prices lead to more sales.'
          />
          <br />
          <Input
            label='Name'
            id='name'
            placeholder='Enter name'
            dispatch={(data) => console.log(data)}
          />
          <Select
            label='This man nah mad man and him dey waist time'
            placeholder='Select Product'
            options={['Shoes', 'Bags', 'Boys Clothes', 'Girls Clothes', 'Wigs']}
            dispatch={(data) => console.log(data)}
          />
          <Button loading={true} />
          <Button loading={true} loadingText={'Processing'} />
          <Button
            text='Button with Left Icon'
            iconLeft={'/svg/arrow-right.svg'}
          />
          <Button
            text='Button with Right Icon'
            iconRight={'/svg/arrow-right.svg'}
          />
        </div>
      </div>
    );
  }
}
