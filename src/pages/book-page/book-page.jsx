import { Book } from '../../components/book';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';
import { NavMenu } from '../../components/nav-menu';

import '../main/main-page.css';
import '../../components/main-container/main-container.css';
import './book-page.css';

export const BookPage = () => (
  <section className='book-page'>
    <Header />
    <div className='main-container'>
      <NavMenu />
      <Book />
    </div>
    <Footer />
  </section>
);
