/* eslint-disable complexity */
// import { ReactComponent as EnterIcon } from '../../images/Enter_icon_arrow.svg';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink,useNavigate  } from 'react-router-dom';
import axios from 'axios';

import { CustomInput } from '../../components/custom-input';
import { InputId, InputMessage, InputPlaceholder, InputType } from '../../components/utils.js';
import { ReactComponent as CheckedIcon } from '../../images/CheckCircle.svg';
import { ReactComponent as EyeIsClosed } from '../../images/Icon_eye_isclosed.svg';
import { ReactComponent as EyeIsOpened } from '../../images/Icon_eye_isopened.svg';
import { ReactComponent as LogInArrow } from '../../images/log-in-arrow.svg';

import './registration.css';
import '../../components/button/button.css';

export const Registration = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const btnTitle = step === 1 ? 'Следующий шаг' : step === 2 ? 'Последний шаг' : 'Зарегистрироваться';
  const successOrNo = 'Регистрация успешна';
  const successOrNoMessage = 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль';
  const btnResultTitle = 'Вход';

  const setHandleStep = () => {
    setStep(step + 1);
  };
  const setPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const baseUrl = 'https://strapi.cleverland.by/api/auth/local/register'


  const getReg = async (data) => {
      await axios
              .post(baseUrl, {
                  'email': String(data.email),
                  'username': data.username,
                  'password': data.password,
                  'firstName': data.firstName,
                  'lastName': data.lastName,
                  'phone':String(data.phone),
              }).then((data) => {
                  console.log(data)                           
              }).catch((err) => {
                  console.log(err);
              
              })
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({mode:'onChange'});
  const onSubmit = (data) => {
  if (step<3) {
    setHandleStep();
  }
    else if (step  === 3) {
      setHandleStep();
      getReg(data);
    } else
      navigate('/auth');
  }



const btnStyle = step <= 3 && (!!errors.login || !!errors.password || 
!!errors.tel || !!errors.email || 
!!errors.firstName || !!errors.lastName) ? 'reserv-btn ordered' : 'reserv-btn';

return (
  <div className='container__log'>
    <h3 className='cleverland-title'>Cleverland</h3>
    {step <= 3 && (
      <form className='custom-form' noValidate={true} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h4 className='custom-title'>Регистрация</h4>
          <div className='custom-step'>
            <span>{step}</span> шаг из 3
          </div>
        </div>
        {step === 1 && (
          <Fragment>
            <CustomInput
              width='416px'
              type={InputType.Text}
              id={InputId.Login}
              placehold={InputPlaceholder.CreateLogin}
              message={InputMessage.CreateUserName}
              errors={errors.username}
              required={true}
              autoComplete='on'
              {...register('username', { required: true, pattern: /^[A-Za-z0-9]+$/ })}
            />

            <div className='custom-item'>
              <input
                id='password'
                autoComplete='on'
                type={isPasswordVisible ? InputType.Text : InputType.Password}
                className='custom-input'
                required={true}
                onBlur={onSubmit}
                {...register(
                  'password',
                  {
                      required: true,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                  })}
              />
              <label htmlFor='password' className='custom-label'>
                {InputPlaceholder.Password}
              </label>
              {isPasswordVisible ? (
                <Fragment>
                  {!errors.password && watch('password') && <CheckedIcon className='done' />}
                  <EyeIsOpened onClick={setPassword} className='eye' />
                </Fragment>
              ) : (
                <Fragment>
                  {!errors.password && watch('password') && <CheckedIcon className='done' />}
                  <EyeIsClosed onClick={setPassword} className='eye' />
                </Fragment>
              )}
              {errors.password && <span className='field_invalid'>{InputMessage.Password}</span>}
              {!errors.password && <span className='field_valid'>{InputMessage.Password}</span>}
            </div>
          </Fragment>
        )}

        {step === 2 && (
          <Fragment>
            <CustomInput
              type={InputType.Text}
              id={InputId.FirstName}
              placehold={InputPlaceholder.FirstName}
              message={InputMessage.FirstName}
              errors={errors.firstName}
              required={true}
              autoComplete='on'
              {...register('firstName', {
                required: true,
                pattern: /^[A-Za-z0-9]+$/,
              })}
            />
            <CustomInput
              type={InputType.Text}
              id={InputId.LastName}
              placehold={InputPlaceholder.LastName}
              message={InputMessage.LastName}
              errors={errors.lastName}
              required={true}
              autoComplete='on'
              {...register('lastName', {
                required: true,
                pattern: /^[A-Za-z0-9]+$/,
              })}
            />
          </Fragment>
        )}
        {step === 3 && (
          <Fragment>
            <CustomInput
              type={InputType.Tel}
              id={InputId.Tel}
              placehold={InputPlaceholder.Tel}
              message={InputMessage.Tel}
              errors={errors.phone}
              required={true}
              autoComplete='on'
              {...register('phone', {
                required: true,
                pattern: /^(?:\+375|375|80)\s?\(?(?:25|29|33|44)\)?\s?\d{3}\s?-?\d{2}\s?-?\d{2}/g,
              })}
            />
            <CustomInput
              type={InputType.Email}
              id={InputId.Email}
              placeholder={InputPlaceholder.Email}
              message={InputMessage.Email}
              errors={errors.email}
              required={true}
              autoComplete='on'
              {...register('email', {
                required: true,
                pattern: /[^\s@]+@[^\s@]+\.[^\s@]+/,
              })}
            />
          </Fragment>
        )}
        <div className='btn-and-link-to-auth-page'>
          <input type='submit' value={btnTitle} className={btnStyle} />
          <div className='link-to-auth-page'>
       
            <span className='log-in-question'>Есть учётная запись?</span>
            <NavLink to='/auth'>
            <div className='login-in-link'>
              <span>войти</span>
              <LogInArrow />
            </div>
         </NavLink>
          </div>
        </div>
      </form>
    )}

    {step > 3 && (
      <form className='custom-form result' noValidate={true} onSubmit={handleSubmit(onSubmit)}>
        <h4 className='custom-title result'>{successOrNo}</h4>
        <span className='custom-item result'>{successOrNoMessage}</span>
        <input type='submit' value={btnResultTitle} className='reserv-btn' />
      </form>
    )}
  </div>
)}
