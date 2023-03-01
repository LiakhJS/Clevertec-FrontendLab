// import React from 'react';

import React from 'react';

import '../registration/registration.css';
import './custom-input.css';


export const CustomInput = React.forwardRef((props, ref) => (
  <div className='custom-item'>
    <input
     ref={ref}
      {...props}
      placeholder=''
     
      className='custom-input'
    />
    <label htmlFor={props.name} className='custom-label'>
      {props.placehold}
    </label>

    {props.errors && <span className='field_invalid'>{props.message}</span>}
    {!props.errors && <span className='field_valid'>{props.message}</span>}
  </div>
))

