import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import avatar from '../../images/avatar.png';
import logo from '../../images/logo-clevertec_40.png';
import { changeBurgerState } from '../../redux/reducer';

import './header.css';

export const Header = () => {
  const dispatch = useDispatch();

  const isOpenedBurger = useSelector((state) => state.burger.isOpenedBurger);
  const toggleMenuMode = (e) => {
    e.stopPropagation();
    dispatch(changeBurgerState(!isOpenedBurger));
    e.preventDefault();
  };

  return (
    <header className='header mobile active-book'>
      <div className='header__main mobile'>
        <a href='/'>
          <img src={logo} className='header__main_logo' alt='cleverlab-logo' />
        </a>
        <div
          className='header__main_logo mobile'
          role='presentation'
          onClick={toggleMenuMode}
          data-test-id='button-burger'
        >
          <input type='checkbox' id='hamburger' />
          <label htmlFor='hamburger' className={classNames('hamburger', { visible: isOpenedBurger })}>
            <span className='line' />
            <span className='line' />
            <span className='line' />
          </label>
        </div>

        <span className='header__main_name mobile'>Cleverland</span>
      </div>
      <h3 className='header__title mobile '>Библиотека</h3>
      <div className='header__person mobile '>
        <span className='header__person_name'>Привет, Вася!</span>
        <img src={avatar} className='header__person_logo avatar' alt='avatar' />
      </div>
    </header>
  );
};




// import { useDispatch, useSelector } from 'react-redux';
// import classNames from 'classnames';

// import avatar from '../../images/avatar.png';
// import logo from '../../images/logo-clevertec_40.png';
// import { changeBurgerState } from '../../redux/reducer';

// import './header.css';

// export const Header = ({books}) => {
//   const dispatch = useDispatch();

//   const isOpenedBurger = useSelector((state) => state.burger.isOpenedBurger);
//   const toggleMenuMode = (e) => {
//     e.stopPropagation();
//     dispatch(changeBurgerState(!isOpenedBurger));
//     e.preventDefault();
//   };

//   return (
//     <header className='header mobile active-book'>
//       <div className='header__main mobile'>
//         <a href='/'>
//           <img src={logo} className='header__main_logo' alt='cleverlab-logo' />
//         </a>
//         <div
//           className='header__main_logo mobile'
//           role='presentation'
//           onClick={toggleMenuMode}
//           data-test-id='button-burger'
//         >
//           <input type='checkbox' id='hamburger' />
//           <label htmlFor='hamburger' className={classNames('hamburger', { visible: isOpenedBurger })}>
//             <span className='line' />
//             <span className='line' />
//             <span className='line' />
//           </label>
//         </div>

//         <span className='header__main_name mobile'>Cleverland</span>
//       </div>
//       <h3 className='header__title mobile '>Библиотека</h3>
//       <div className='header__person mobile '>
//         <span className='header__person_name'>{books[1].title}</span>
//         <img src={avatar} className='header__person_logo avatar' alt='avatar' />
//       </div>
//     </header>
//   );
// };
