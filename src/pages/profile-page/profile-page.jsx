import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { CustomInput } from '../../components/custom-input';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Loader } from '../../components/loader';

import { InputId, InputMessage, InputPlaceholder, InputType } from '../../components/utils';
import { ReactComponent as CheckedIcon } from '../../images/CheckCircle.svg';
import { ReactComponent as EyeIsClosed } from '../../images/Icon_eye_isclosed.svg';
import { ReactComponent as EyeIsOpened } from '../../images/Icon_eye_isopened.svg';
import { changeUserInformationThunk, getUserThunk, setPictureThunk } from '../../redux/comment';
import { FileUploadSingle } from '../../upload';

import '../main/main-page.css';
import '../../components/header/header.css';
import '../../components/main-container/main-container.css';
import './profile-page.css';

// eslint-disable-next-line complexity
export const ProfilePage = () => {
  const formData = new FormData();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.bookComment.user);
  const userStatus = useSelector((state) => state.bookComment.userStatus);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState(null);
  const HOST = 'https://strapi.cleverland.by';
  const pictureLoadingStatus = useSelector((state) => state.bookComment.pictureLoadingStatus);

  useEffect(() => {
    dispatch(getUserThunk());


  }, [dispatch]);

  const handleClick = (data) => {
    dispatch(changeUserInformationThunk({
      data: {
        'email': String(data.email),
        'username': String(data.username),
        'password': String(data.password),
        'firstName': String(data.firstName),
        'lastName': String(data.lastName),
        'phone': String(data.phone),
      }, userID: user.id
    }))
  }

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
    handleClick(data);
    setIsEdit(false);
    setTimeout(() => {
      dispatch(getUserThunk());
    }, 0)
  }

  const onClick = (event) => {
    event.preventDefault();
    setIsEdit(!isEdit);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

  }

  useEffect(() => {
    if (file) {
      formData.append('files', file);
      dispatch(setPictureThunk(formData));
      setFile(null);
    }
  }, [dispatch, file, formData])

  return (
    <section className='profile-page'>
      <Header />
      <div className='main-container'>
        {(userStatus === 'loading' || pictureLoadingStatus === 'loading') && <Loader />}
        {userStatus === 'resolved' &&
          <div className='profile'>
            <div className="profile__ava">
              <div className="profile__ava_picture" >
                <img src={user.avatar ? `${HOST}${user.avatar}` : null} alt='user-avatar' />
                <FileUploadSingle handleFileChange={handleFileChange} />
              </div>
              <div className="profile__ava_name"><span>{user.firstName}</span> <span>{user.lastName}</span></div>
            </div>

            <div className='profile__data'>
              <h4 >Учётные данные</h4>
              <span>Здесь вы можете отредактировать информацию о себе.</span>

              <form className='custom-form profile' noValidate={true} onSubmit={handleSubmit(onSubmit)}>
                <div className='profile__form-block'>
                  <CustomInput
                    width='416px'
                    type={InputType.Text}
                    id={InputId.Login}
                    placehold={InputPlaceholder.Login}
                    message={InputMessage.CreateUserName}
                    errors={errors.username}
                    required={true}
                    disabled={isEdit ? false : true}
                    autoComplete='on'
                    {...register('username', { value: `${user.username}`, required: true, pattern: /^[A-Za-z0-9]+$/ })}
                  />
                  <div className='custom-item'>
                    <input
                      id='password'
                      autoComplete='on'
                      type={isPasswordVisible ? InputType.Text : InputType.Password}
                      className='custom-input'
                      required={true}
                      disabled={isEdit ? false : true}
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
                        <EyeIsOpened className='eye' />
                        {/* <EyeIsOpened onClick={setPassword} className='eye' /> */}
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
                  <CustomInput
                    type={InputType.Text}
                    id={InputId.FirstName}
                    placehold={InputPlaceholder.FirstName}
                    message={InputMessage.FirstName}
                    errors={errors.firstName}
                    required={true}
                    disabled={isEdit ? false : true}
                    autoComplete='on'
                    {...register('firstName', {
                      value: `${String(user.firstName)}`,
                      required: true,
                      pattern: /^[A-Za-z0-9]+$/,
                    })}
                  />

                </div>
               <div className='profile__form-block'>
                  <CustomInput
                    type={InputType.Text}
                    id={InputId.LastName}
                    placehold={InputPlaceholder.LastName}
                    message={InputMessage.LastName}
                    errors={errors.lastName}
                    required={true}
                    disabled={isEdit ? false : true}
                    autoComplete='on'
                    {...register('lastName', {
                      value: `${String(user.lastName)}`,
                      required: true,
                      pattern: /^[A-Za-z0-9]+$/,
                    })}
                  />
                  <CustomInput
                    type={InputType.Tel}
                    id={InputId.Tel}
                    placehold={InputPlaceholder.Tel}
                    message={InputMessage.Tel}
                    errors={errors.phone}
                    required={true}
                    disabled={isEdit ? false : true}
                    autoComplete='on'
                    {...register('phone', {
                      value: `${String(user.phone)}`,
                      required: true,
                      pattern: /^(?:\+375|375|80)\s?\(?(?:25|29|33|44)\)?\s?\d{3}\s?-?\d{2}\s?-?\d{2}/g,
                    })}
                  />
                  <CustomInput
                    type={InputType.Email}
                    id={InputId.Email}
                    placehold={InputPlaceholder.Email}
                    message={InputMessage.Email}
                    errors={errors.email}
                    required={true}
                    disabled={isEdit ? false : true}
                    autoComplete='on'
                    {...register('email', {
                      value: `${String(user.email)}`,
                      required: true,
                      pattern: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                    })}
                  />
                </div>
              </form>
              <div className='edit-btns'>
                <input type='button' onClick={onClick} value={isEdit ? 'отменить изменения' : 'редактировать'} className={isEdit ? 'ordered reserv-btn' : 'reserv-btn reserved'} />
                <input type='submit' value='сохранить изменения' className={isEdit ? 'reserv-btn ' : 'ordered reserv-btn'} />
              </div>
            </div>
          </div>}
        <div />
      </div>
      <Footer />
    </section>
  );
}
