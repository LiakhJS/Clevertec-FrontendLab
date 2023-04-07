import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Book } from '../../components/book';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { NavMenu } from '../../components/nav-menu';
import { getBookThunk } from '../../redux/book';
import { setRateModalIsOpened } from '../../redux/comment';
import { setIsHiddenGenres } from '../../redux/reducer';

import '../main/main-page.css';
import '../../components/main-container/main-container.css';
import './book-page.css';
// import { getCategoriesThunk } from '../../redux/categories';

export const BookPage = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const bookStatusLoading = useSelector((state) => state.book.status);
  const bookData = useSelector((state) => state.book.book);

  useEffect(() => {
    dispatch(getBookThunk(Number(bookId)));
    dispatch(setRateModalIsOpened(false));
    dispatch(setIsHiddenGenres(true));
    
  }, [bookId, dispatch]); 
 
return( 
  <section className='book-page'>
    <Header />
    <div className='main-container'>
      <NavMenu />
      <Book bookData={bookData} bookStatusLoading={bookStatusLoading}/>
    </div>
    <Footer />
  </section>
);
}
