
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { InputMessage, InputPlaceholder, InputType } from '../../components/utils.js';
import { ReactComponent as CheckedIcon } from '../../images/CheckCircle.svg';
import { ReactComponent as EyeIsClosed } from '../../images/Icon_eye_isclosed.svg';
import { ReactComponent as EyeIsOpened } from '../../images/Icon_eye_isopened.svg';

import '../registration/registration.css';
import './reset-password.css';
import '../../components/button/button.css';

export const ResetPassword = ({ code }) => {
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [dataIsSent, setDataIsSent] = useState(false);
  const setPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const onSubmit = (data) => {
    setDataIsSent(true);

    axios
      .post('https://strapi.cleverland.by/api/auth/reset-password', {...code, ...data})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  

console.log({...code, ...data})
  if (dataIsSent) {
    navigate('/auth');
  }

}

return (
  <div className='container__log'>
    <h3 className='cleverland-title'>Cleverland</h3>
    {!dataIsSent &&
      <form className='custom-form' noValidate={true} onSubmit={handleSubmit(onSubmit)}>
        <h4 className='custom-title'>Восстановление пароля</h4>

        <div className='custom-item'>
          <input
            id='password'
            autoComplete='on'
            type={isPasswordVisible ? InputType.Text : InputType.Password}
            className='custom-input'

            required={true}

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
        <div className='custom-item'>
          <input
            id='passwordConfirmation'
            autoComplete='on'
            type={isPasswordVisible ? InputType.Text : InputType.Password}
            className='custom-input'
            required={true}

            {...register(
              'passwordConfirmation',
              {
                required: true,
                validate: (input) => input === watch('password')
              })}
          />
          <label htmlFor='passwordConfirmation' className='custom-label'>
            {InputPlaceholder.Password}
          </label>
          {isPasswordVisible ? (<EyeIsOpened onClick={setPassword} className='eye' />) : (<EyeIsClosed onClick={setPassword} className='eye' />)}
          {errors.passwordConfirmation && <span className='field_invalid'>Пароли не совпадают</span>}
          {(!errors.passwordConfirmation) && <span className='field_valid' />}
        </div>
        <div className='btn-and-link-to-auth-page'>
          <input type='submit' value='Сохранить изменения' className='reserv-btn' />
          <div className='link-to-auth-page'>

            <span className='log-in-question'>После сохранения войдите в библиотеку, используя новый пароль</span>

          </div>
        </div>
      </form>
    }
    {dataIsSent && <form className='custom-form result newpass' noValidate={true} onSubmit={handleSubmit(onSubmit)}>
      <h4 className='custom-title result '>Новые данные сохранены</h4>
      <span className='custom-item result '>Зайдите в личный кабинет, используя свои логин и новый пароль</span>
      <NavLink to='/auth'><input type='submit' value="Вход" className='reserv-btn' /></NavLink>
    </form>}
  </div>
)
}
