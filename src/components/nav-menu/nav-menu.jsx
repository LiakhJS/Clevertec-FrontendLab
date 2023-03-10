import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as Arrow } from '../../images/arrow-down.svg';
import {
  changeBurgerState,
  rotateArrow,
  setIsActiveGenre,
  setIsActiveShowcase,
  setIsActiveTermsLink,
  setIsActiveTreatyLink,
  setIsHiddenGenres} from '../../redux/reducer';
import { genres } from '../utils';

import './nav-menu.css';

export const NavMenu = () => {
  const dispatch = useDispatch();
  const isArrowTransformed = useSelector((state)=> state.burger.isArrowTransformed);

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

  const checkActiveGenre = (e) => {
    const navMenuGenres = document.querySelectorAll('.nav-menu__genre-sects_g');

    // dispatch(setIsHiddenGenres(true));
    navMenuGenres.forEach((item) => {
      dispatch(setIsActiveTermsLink(false));
      dispatch(setIsActiveTreatyLink(false));
      dispatch(changeBurgerState(false));
      if (e.target === item) {
        item.classList.add('nav-menu__title');
        dispatch(setIsActiveGenre(true));
        dispatch(setIsActiveShowcase(false));
      } else {
        item.classList.remove('nav-menu__title');
        dispatch(setIsActiveGenre(true));
        dispatch(setIsActiveShowcase(false));
      }
    });
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
  const isActiveGenre = useSelector((state) => state.burger.isActiveGenre);
  const isActiveTermsLink = useSelector((state) => state.burger.isActiveTermsLink);

  return (
    <nav className={classNames('nav-menu mobile', { visible: isBurgerOpened })} data-test-id='burger-navigation'>
      <NavLink to='/genre/all' data-test-id={isBurgerOpened ? 'burger-showcase' : 'navigation-showcase'}>
        {' '}
        <h5
          className={classNames('nav-menu__title', { active: isNotActiveShowCase })}
          role='presentation'
          onClick={isActiveTermsLink||isActiveTreatyLink ? toggleHideShowcase2 :toggleHideShowcase1}
        >
          ?????????????? ???????? <Arrow      color="#F83600" fill="#F83600" stroke="#F83600" className={classNames('arrow', {arrowTrasformation:isArrowTransformed, blackArrow:isActiveTermsLink ||isActiveTreatyLink})} />
        </h5>
      </NavLink>

      <div
      data-test-id={isBurgerOpened ? 'burger-books' : 'navigation-books'}
        className={classNames('nav-menu__genre-sects', { hidden: isHiddenGenres })}
        role='presentation'
        onClick={checkActiveGenre}
      >
        <NavLink to='/genre/all' >
          <div className={isActiveGenre ? 'nav-menu__genre-sects_g nav-menu__title' : 'nav-menu__genre-sects_g '}>
            ?????? ??????????
          </div>
        </NavLink>
        {genres.map((item) => (
          <NavLink to={`/genre/${item.genreRoute}`} key={item.genreRoute}>
            <div className='nav-menu__genre-sects_g' key={item.genreRoute}>
              {item.genre}
              <span>{item.count}</span>
            </div>
          </NavLink>
        ))}
      </div>
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
          ?????????????? ??????????????????????
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
          ?????????????? ????????????
        </div>
      </NavLink>
      <div className='nav-menu__profile-and-exit'>
        <NavLink to=''>
          <div className='nav-menu__profile offer '>??????????????</div>
        </NavLink>
        <NavLink to=''>
          <div className='nav-menu__exit offer'>??????????</div>
        </NavLink>
      </div>
    </nav>
  );
};
