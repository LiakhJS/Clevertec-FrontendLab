import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Booking } from '../../components/booking';
import { Error } from '../../components/error';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { Loader } from '../../components/loader';
import { MainContainer } from '../../components/main-container';
import { setIsOpenedCalendar } from '../../redux/booking';
import { getBooksThunk } from '../../redux/books';
import { getCategoriesThunk } from '../../redux/categories';
import { changeBurgerState, rotateArrow, setIsHiddenGenres } from '../../redux/reducer';

import './main-page.css';

export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hamburger = document.querySelector('.header__main_logo');
  const menu = document.querySelector('.nav-menu');

  document.addEventListener('click', (event) => {
    if (
      !document.querySelector('.nav-menu').contains(event.target) &&
      !(event.target === hamburger) &&
      document.querySelector('.nav-menu').classList.contains('visible') &&
      !(event.target === menu)
    ) {
      dispatch(changeBurgerState(false));
    }
  });


  const booksData = useSelector((state) => state.books.books);
  const categoriesData = useSelector((state) => state.categories);
  const booksStatusLoading = useSelector((state) => state.books.status);

  useEffect(
    () => {
      if (Cookies.get('token') != null) {
        dispatch(getBooksThunk());
        dispatch(getCategoriesThunk());
        dispatch(setIsHiddenGenres(false));
        dispatch(changeBurgerState(false));
        dispatch(rotateArrow(false));
        dispatch(setIsOpenedCalendar(false));
      } else {
        navigate('/');
      }
      ;
    },
    [dispatch]
  );

  const isCalendarOpened = useSelector((state) => state.booking.isCalendarOpened);
  const currentBookStatus = useSelector((state) => state.book.status);


  return (
    <section className='main-page mobile'>
      {booksStatusLoading === 'loading' && <Loader />}
      
      {booksStatusLoading === 'failed' && <Error />}
      {booksStatusLoading === 'resolved' && (
        <React.Fragment>

          <Header />
          <MainContainer books={booksData} categories={categoriesData} />
          <Footer />
        </React.Fragment>
      )}
      {isCalendarOpened === true && currentBookStatus === 'resolved' && <Booking />}

    </section>
  );
};


  