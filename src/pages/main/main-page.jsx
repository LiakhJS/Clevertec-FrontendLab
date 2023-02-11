import { useDispatch } from 'react-redux';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { MainContainer } from '../../components/main-container';
import { changeBurgerState } from '../../redux/reducer';

import './main-page.css';

export const MainPage = () => {
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

  return (
    <section className='main-page mobile'>
      <Header />
      <MainContainer />
      <Footer />
    </section>
  );
};
