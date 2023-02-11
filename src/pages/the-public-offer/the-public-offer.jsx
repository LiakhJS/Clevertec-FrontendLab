import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { NavMenu } from '../../components/nav-menu';
import { TreatyContent } from '../../components/treaty-content';
import { setIsHiddenGenres } from '../../redux/reducer';

import '../main/main-page.css';
import '../../components/main-container/main-container.css';
import './the-public-offer.css';

export const ThePublicOffer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsHiddenGenres(true));
  });

  return (
    <section className='the-public-offer mobile'>
      <Header />
      <div className='main-container'>
        <NavMenu />

        <TreatyContent />
      </div>
      <Footer />
    </section>
  );
};
