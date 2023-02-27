import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Book } from '../../components/book';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { NavMenu } from '../../components/nav-menu';
import { getBookThunk } from '../../redux/book';

import '../main/main-page.css';
import '../../components/main-container/main-container.css';
import './book-page.css';

export const BookPage = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const bookStatusLoading = useSelector((state) => state.book.status);
  const bookData = useSelector((state) => state.book.book);

  useEffect(() => {
    dispatch(getBookThunk(Number(bookId)));
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
