// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { Error } from '../../components/error';

// import { Footer } from '../../components/footer';
// import { Header } from '../../components/header';
// import { Loader } from '../../components/loader';
// import { MainContainer } from '../../components/main-container';
import { Registration } from '../../components/registration';

// import { getBooksThunk } from '../../redux/books';
// import { getCategoriesThunk } from '../../redux/categories';
// import { changeBurgerState, rotateArrow, setIsHiddenGenres } from '../../redux/reducer';
import './main-page.css';

export const MainPage = () => (
// {
//   const dispatch = useDispatch();
//   const hamburger = document.querySelector('.header__main_logo');
//   const menu = document.querySelector('.nav-menu');

//   document.addEventListener('click', (event) => {
//     if (
//       !document.querySelector('.nav-menu').contains(event.target) &&
//       !(event.target === hamburger) &&
//       document.querySelector('.nav-menu').classList.contains('visible') &&
//       !(event.target === menu)
//     ) {
//       dispatch(changeBurgerState(false));
//     }
//   });


//   const booksData = useSelector((state) => state.books.books);
//   const categoriesData = useSelector((state) => state.categories);
//   const booksStatusLoading = useSelector((state) => state.books.status);

//   useEffect(
//  () => {
//       dispatch(getBooksThunk());
//       dispatch(getCategoriesThunk());
//       dispatch(setIsHiddenGenres(false));
//       dispatch(rotateArrow(false));
//     },
//     [dispatch]
//   );
  
  

  // return (
    <section className='main-page mobile'>
      {/* {booksStatusLoading === 'loading' && <Loader/>}
      {booksStatusLoading === 'failed' && <Error />}
      {booksStatusLoading === 'resolved' && (
        <React.Fragment>

               <Header  />
          <MainContainer  books={booksData} categories={categoriesData} />
          <Footer />
        </React.Fragment>
      )} */}
              <Registration />
    </section>
  );
// };







// const thunkFunction = (dispatch) => {
//   axios
//     .get('https://strapi.cleverland.by/api/books')
//     .then((response) => {
//       dispatch(setAllBooks(response));
//     })
//     .catch((error) => document.write(error));
// };

// useEffect(
//   () => () => {
//     store.dispatch(thunkFunction);
//   },
//   []
// );

// const [games, setGames] = useState([]);
// useEffect(() => {
//   axios
//     .get('https://strapi.cleverland.by/api/books')
//     .then((response) => setGames(response))
//     .catch((error) => `There is the ${error}`);
// }, []);

// const functionS = () => {
//   const boks = store.getState().books.allBooks;
//   console.log(boks.data[1].image.url);
// };

// if (!booksStatusLoading || booksStatusLoading === 'failed') {
//     return <Error />
// }

// if (booksStatusLoading === 'loading') {
//     return <Loader />
// }
