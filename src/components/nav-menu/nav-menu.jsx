import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation,useParams  } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import { ReactComponent as Arrow } from '../../images/arrow-down.svg';
import { getCategoriesThunk } from '../../redux/categories';
import {   changeBurgerState,
  rotateArrow,
setActiveCategory ,
  setIsActiveGenre,
  setIsActiveShowcase,
  setIsActiveTermsLink,
  setIsActiveTreatyLink,
  setIsHiddenGenres,
} from '../../redux/reducer';

// import { genres } from '../utils';
import './nav-menu.css';

export const NavMenu = ({ books }) => {
  const dispatch = useDispatch();
  const isArrowTransformed = useSelector((state) => state.burger.isArrowTransformed);

  const checkActiveTreatyLink = () => {
    dispatch(setIsActiveTermsLink(false));
    dispatch(setIsActiveTreatyLink(true));
    dispatch(setIsActiveGenre(false));
    dispatch(setIsActiveShowcase(true));
    dispatch(setIsHiddenGenres(true));
    dispatch(changeBurgerState(false));
  };

  const checkActivePublicOffer = () => {
    dispatch(setIsActiveTermsLink(true));
    dispatch(setIsActiveTreatyLink(false));
    dispatch(setIsActiveGenre(false));
    dispatch(setIsActiveShowcase(true));
    dispatch(setIsHiddenGenres(true));
    dispatch(changeBurgerState(false));
  };
  const categoriesData = useSelector((state) => state.categories);
  const booksCategories = categoriesData.categories;
  const categoriesLoadStatus = categoriesData.status;
  const isLoadResolved = categoriesLoadStatus === 'resolved';
  const activeCategory = useSelector((state) => state.burger.activeCategory);
const location = useLocation();
  const { category } = useParams();

  if(location.pathname ==='/books/all') {
    dispatch(setActiveCategory('all'));
   } 
   
   booksCategories.forEach((item) => {
    if (item.path === category) {
      dispatch(setActiveCategory(item.path));
    } 
  });
  const checkActiveGenre = () => {
    dispatch(setIsActiveTermsLink(false));
    dispatch(setIsActiveTreatyLink(false));
    dispatch(changeBurgerState(false));
  };

  const isHiddenGenres = useSelector((state) => state.burger.isHiddenGenres);

  const toggleHideShowcase1 = () => {
    dispatch(setIsHiddenGenres(!isHiddenGenres));
    dispatch(setIsActiveShowcase(false));
    dispatch(setIsActiveTermsLink(false));
    dispatch(setIsActiveTreatyLink(false));
    dispatch(setIsActiveGenre(true));
    dispatch(rotateArrow(!isArrowTransformed));
  };
  const toggleHideShowcase2 = () => {
    dispatch(setIsHiddenGenres(true));
    dispatch(setIsActiveShowcase(false));
    dispatch(setIsActiveTermsLink(false));
    dispatch(setIsActiveTreatyLink(false));
    dispatch(setIsActiveGenre(true));
  };
  const isBurgerOpened = useSelector((state) => state.burger.isOpenedBurger);
  const isNotActiveShowCase = useSelector((state) => state.burger.isNotActiveShowCase);
  const isActiveTreatyLink = useSelector((state) => state.burger.isActiveTreatyLink);
  // const isActiveGenre = useSelector((state) => state.burger.isActiveGenre);
  const isActiveTermsLink = useSelector((state) => state.burger.isActiveTermsLink);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const logOut = () => {
    Cookies.remove('token');
};

  return (
    <nav className={classNames('nav-menu mobile', { visible: isBurgerOpened })} data-test-id='burger-navigation'>
      <NavLink to='/books/all' data-test-id={isBurgerOpened ? 'burger-showcase' : 'navigation-showcase'}>
        {' '}
        <h5
          className={classNames('nav-menu__title', { active: isNotActiveShowCase })}
          role='presentation'
          onClick={isActiveTermsLink || isActiveTreatyLink ? toggleHideShowcase2 : toggleHideShowcase1}
        >
          Витрина книг{' '}
          <Arrow
            color='#F83600'
            fill='#F83600'
            stroke='#F83600'
            className={classNames('arrow', {
              arrowTrasformation: isArrowTransformed,
              blackArrow: isActiveTermsLink || isActiveTreatyLink,
            })}
          />
        </h5>
      </NavLink>

      {isLoadResolved && (
        <div
          data-test-id={isBurgerOpened ? 'burger-books' : 'navigation-books'}
          className={classNames('nav-menu__genre-sects', { hidden: isHiddenGenres })}
          role='presentation'
          onClick={checkActiveGenre}
        >
          <NavLink to='/books/all'>
            <div className={activeCategory === 'all' ? 'nav-menu__genre-sects_g nav-menu__title' : 'nav-menu__genre-sects_g '}>
              Все книги
            </div>
          </NavLink>
          {booksCategories.map((item) => (
            <NavLink to={`/books/${item.path}`} key={item.path}>
              <div className={activeCategory === item.path ? 'nav-menu__genre-sects_g nav-menu__title' : 'nav-menu__genre-sects_g '} key={item.path}>
                {item.name}
                {/* <span>{item.count}</span> */}
                <span>
                  {books && books.filter((book) => book.categories.some((amount) => amount === item.name)).length}{' '}
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      )}

      <NavLink
        to='/terms-of-use/'
        onClick={checkActivePublicOffer}
        role='presentation'
        data-test-id={isBurgerOpened ? 'burger-terms' : 'navigation-terms'}
      >
        <div
          className={
            isActiveTermsLink ? 'nav-menu__terms-of-use offer nav-menu__title' : 'nav-menu__terms-of-use offer '
          }
        >
          Правила пользования
        </div>
      </NavLink>
      <NavLink
        to='/public-offer/'
        onClick={checkActiveTreatyLink}
        role='presentation'
        data-test-id={isBurgerOpened ? 'burger-contract' : 'navigation-contract'}
      >
        <div
          className={
            isActiveTreatyLink ? 'nav-menu__the-public-offer offer nav-menu__title' : 'nav-menu__the-public-offer offer'
          }
        >
          Договор оферты
        </div>
      </NavLink>
      <div className='nav-menu__profile-and-exit'>
        <NavLink to=''>
          <div className='nav-menu__profile offer '>Профиль</div>
        </NavLink>
        <NavLink to='/' onClick={logOut}>
          <div className='nav-menu__exit offer'>Выход</div>
        </NavLink>
      </div>
    </nav>
  );
};
