// import { useState } from 'react';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { NavMenu } from '../../components/nav-menu';
import { TermsContent } from '../../components/terms-content';
import { setIsHiddenGenres } from '../../redux/reducer';

import '../main/main-page.css';
import '../../components/main-container/main-container.css';
import './terms-of-use.css';

export const TermsOfUse = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsHiddenGenres(true));
  });

  return (
    <section className='terms-of-use mobile'>
      <Header />
      <div className='main-container'>
        <NavMenu />
        <TermsContent />
      </div>
      <Footer />
    </section>
  );
};
