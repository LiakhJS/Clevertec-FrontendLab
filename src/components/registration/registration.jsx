// import { ReactComponent as EnterIcon } from '../../images/Enter_icon_arrow.svg';
import { Fragment,  useState } from 'react';
// import { } from 'react';
// import {  } from 'react';
// import { } from 'react';
import { useForm } from 'react-hook-form';

import { ReactComponent as CheckedIcon } from '../../images/CheckCircle.svg';
// import classNames from 'classnames';
import { ReactComponent as EyeIsClosed } from '../../images/Icon_eye_isclosed.svg';
import { ReactComponent as EyeIsOpened } from '../../images/Icon_eye_isopened.svg';
import { CustomInput } from '../custom-input';
import { InputId, InputMessage, InputPlaceholder, InputType } from '../utils.js';

import './registration.css';

export const Registration = () => {
  const {
    register,
    handleSubmit,
      watch,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => console.log(data);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const setPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className='container'>
      <h3 className='cleverland-title'>Cleverland</h3>
      <form className='custom-form' noValidate={true} onSubmit={handleSubmit(onSubmit)}>
        <h4 className='custom-title'>Регистрация</h4>
        <div className='custom-step'>
          <span>1</span> шаг из 3
        </div>

        <CustomInput
          type={InputType.Text}
          id={InputId.Login}
          placehold={InputPlaceholder.CreateLogin}
          message={InputMessage.CreateUserName}
          errors={errors.login}
          required={true}
          autoComplete='on'
          {...register('login', {
            required: { value: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ },
          })}
        />

        <div className='custom-item'>
          <input
    
            id={InputId.Password}
            autoComplete='on'
            type={isPasswordVisible ? InputType.Text : InputType.Password}
            className='custom-input'
            required={true}
            {...register('password', { required: { value: true, minlength: 5 } })}
          />
          <label htmlFor='password' className='custom-label'>
            {InputPlaceholder.Password}
          </label>
          {isPasswordVisible ? (
            <Fragment>
              {!errors.password  &&  watch('password') && <CheckedIcon className='done' />}
              <EyeIsOpened onClick={setPassword} className='eye' />
            </Fragment>
          ) : (
            <Fragment>
              {!errors.password  &&  watch('password') && <CheckedIcon className='done' />}
              <EyeIsClosed onClick={setPassword} className='eye' />
            </Fragment>
          )}
          {errors.password && <span className='field_invalid'>{InputMessage.Password}</span>}
          {!errors.password && <span className='field_valid'>{InputMessage.Password}</span>}
        </div>

        <input type='submit' />
      </form>
    </div>
  );
};
