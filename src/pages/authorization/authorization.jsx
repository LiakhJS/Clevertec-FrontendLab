import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from  'js-cookie';

// import Cookies from 'js-cookie';
import { CustomInput } from '../../components/custom-input';
import { InputId, InputPlaceholder, InputType } from '../../components/utils.js';
import { ReactComponent as EyeIsClosed } from '../../images/Icon_eye_isclosed.svg';
import { ReactComponent as EyeIsOpened } from '../../images/Icon_eye_isopened.svg';
import { ReactComponent as LogInArrow } from '../../images/log-in-arrow.svg';

import '../registration/registration.css';
import './authorization.css';
import '../../components/button/button.css';

export const Authorization = () => {

const navigate=useNavigate();

  const baseUrl = 'https://strapi.cleverland.by/api/auth/local'
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const btnTitle = 'Вход'
  const setPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [dataIsSent, setDataIsSent] = useState(false);
const setAuthToken = token => {
   if (token) {
       axios.defaults.headers.common.Authorization = `Bearer ${token}`;
   }
   else
       delete axios.defaults.headers.common.Authorization;
}


  const authRequest = async (data) => {


    axios
      .post(baseUrl, {
        'identifier': data.identifier,
        'password': data.password,
      })
      .then((response) => {
        // get token from response
       const token = response.data.jwt;
 
       // set JWT token to local
      //  localStorage.setItem('token', token);
      Cookies.set('token', token);
 
       // set token to axios common header
       setAuthToken(token);
       navigate('/books/all');
 
// redirect user to home page

     })
   
      .catch((error) => error.response.status);

  };
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setDataIsSent(true);
    authRequest(data);

  }

  return (
    <div className='container__log'>
      <h3 className='cleverland-title'>Cleverland</h3>
      {!dataIsSent &&
        <form className='custom-form auth' noValidate={true} onSubmit={handleSubmit(onSubmit)}>
          <h4 className='custom-title'>Вход в личный кабинет</h4>
          <CustomInput
            width='416px'
            type={InputType.Text}
            id={InputId.Login}
            placehold={InputPlaceholder.Login}
            errors={errors.password || errors.identifier}
            required={true}
            autoComplete='on'
            {...register('identifier', { required: true, pattern: /^[A-Za-z0-9]+$/ })}
          />
          <div className='custom-item'>
            <input
              id={InputId.Password}
              autoComplete='on'
              type={isPasswordVisible ? InputType.Text : InputType.Password}
              className='custom-input'
              required={true}
              {...register('password', {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              })}
            />
            <label htmlFor='password' className='custom-label'>
              {InputPlaceholder.Password}
            </label>
            {isPasswordVisible ?
              <EyeIsOpened onClick={setPassword} className='eye' />
              :
              <EyeIsClosed onClick={setPassword} className='eye' />
            }
            {(errors.password || errors.login) && <div className='field_invalid-and-restore'>
              <span className='field_invalid'>Неверный логин или пароль!</span>
              <NavLink to='/forgot-pass'> <span className='field_invalid restore '>Восстановить?</span></NavLink>
            </div>}
            {(!errors.password && !errors.login) && <NavLink to='/forgot-pass'><span className='field_valid forgot-pass'>Забыли логин или пароль?</span></NavLink>}
          </div>
          <div className='btn-and-link-to-auth-page'>
            <input type='submit' value={btnTitle} className='reserv-btn' />
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
        </form>}
      {dataIsSent &&
        <form className='custom-form auth result' noValidate={true} onSubmit={handleSubmit(onSubmit)}>
          <h4 className='custom-title result'>Вход не выполнен</h4>
          <span className='custom-item result'>Что-то пошло не так. Попробуйте ещё раз.</span>
          <input type='submit' value="повторить" className='reserv-btn' />
        </form>
      }
    </div>
  )
}
