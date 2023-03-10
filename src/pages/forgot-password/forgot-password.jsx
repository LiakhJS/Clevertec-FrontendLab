
import {  useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { CustomInput } from '../../components/custom-input';
import { InputId, InputPlaceholder, InputType } from '../../components/utils.js';
import { ReactComponent as LogInArrow } from '../../images/log-in-arrow.svg';
import { ReactComponent as LoginArrowLeft } from '../../images/login-icon-arrow-left.svg';
import { ResetPassword } from '../reset-password';

import '../registration/registration.css';
import '../reset-password/reset-password.css';
import '../../components/button/button.css';
import './forgot-password.css'

export const ForgotPassword = () => {
  const [dataIsSent, setDataIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const onSubmit = (data) => {

    setDataIsSent(true);

    axios
      .post('https://strapi.cleverland.by/api/auth/forgot-password', { ...data })
      .then((response) => {
        console.log(response);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [searchParams] = useSearchParams();
  const code = { code: searchParams.get('code') };
  const isCode = searchParams.has('code');
  console.log(code, isCode);


  return (
    <div className='container__log'>
      <h3 className='cleverland-title'>Cleverland</h3>
      {isCode ? <ResetPassword code={code} /> :

        (dataIsSent ?<form className='custom-form result fogot-pass' noValidate={true} onSubmit={handleSubmit(onSubmit)}>
        <h4 className='custom-title result'>Письмо выслано</h4>
        <span className='custom-item result'>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</span>
      </form> :
          <form className='custom-form forgot-pass' noValidate={true} onSubmit={handleSubmit(onSubmit)}>
            <NavLink to='/auth'>
              <div className='login-in-link upper'>
                <LoginArrowLeft />
                <span>вход в личный кабинет</span>
              </div>
            </NavLink>
            <h4 className='custom-title'>Восстановление пароля</h4>
            <CustomInput
              type={InputType.Email}
              id={InputId.Email}
              placehold={InputPlaceholder.Email}
              message='На этот email  будет отправлено письмо с инструкциями по восстановлению пароля'
              errors={errors.email}
              required={true}
              autoComplete='on'
              {...register('email', {
                required: true,
                pattern: /[^\s@]+@[^\s@]+\.[^\s@]+/,
              })}
            />
            <div className='btn-and-link-to-auth-page'>
              <input type='submit' value='Восстановить' className='reserv-btn' />
              <div className='link-to-auth-page'>
                <span className='log-in-question'>Нет учётной записи?</span>
                <NavLink to='/registration'>
                  <div className='login-in-link'>
                    <span>регистрация</span>
                    <LogInArrow />
                  </div>
                </NavLink>
              </div>
            </div>
          </form> 
          )
      }



    </div>
  )
}
