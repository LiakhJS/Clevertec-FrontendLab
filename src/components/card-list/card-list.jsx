import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { filterCatalogByCategory } from '../../redux/books';
import { Card } from '../card/card';
import { NoBooksFound } from '../no-books-found';

// import { cards } from '../utils';
import './card-list.css';

export const CardList = ({ categories, isFormOfList }) => {
  const { category } = useParams();
  const booksByCategory = useSelector((state) => state.books.booksByCategory);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentCategory = categories.categories.find((categ) => categ.path.toLowerCase() === category);
    

    if (category === 'all') {
      dispatch(filterCatalogByCategory('Все книги'));
    } else if (category) {
      dispatch(filterCatalogByCategory(currentCategory.name));

    }
  }, [category, categories,dispatch]);


  const inputValue = useSelector((state) => state.books.inputValue);

  const booksBySearch = booksByCategory.filter((book) => book.title.toLowerCase().includes(inputValue.toLowerCase()));

  const booksBySearchAndSort = [...booksBySearch];
  const isSortByDesc = useSelector((state) => state.books.isSortByDesc);

  if (isSortByDesc) {
    booksBySearchAndSort.sort((a, b) => {
      if (a.rating > b.rating) {
        return 1;
      }
      if (a.rating < b.rating) {
        return -1;
      }

      return 0;
    });
  } else {
    booksBySearchAndSort.sort((a, b) => {
      if (a.rating < b.rating) {
        return 1;
      }
      if (a.rating > b.rating) {
        return -1;
      }

      return 0;
    });
  }

  return (
    <div className={isFormOfList ? 'card-list inColumn mobile' : 'card-list mobile'}>
      <NoBooksFound
        booksByCatNoFound={booksByCategory.length === 0}
        booksBySearchAndSortNotFound={booksBySearchAndSort.length === 0 && booksBySearch !== false}
      />
      {booksBySearchAndSort.map((book) => {
        const bookCategory = categories.categories.find((categor) =>
          book.categories.some((bookCat) => categor.name.toLowerCase() === bookCat.toLowerCase())
        ).path;

        return (
          <NavLink  className={isFormOfList ? 'navlink inColumn ' : null} key={book.id} to={`/book/${bookCategory}/${book.id}`}>
            <Card
              isFormOfList={isFormOfList}
              id={book.id}
              key={book.id}
              authors={book.authors}
              title={book.title}
              booking={book.booking}
              image={book.image}
              delivery={book.delivery}
              category={book.categories}
              rating={book.rating}
              issueYear={book.issueYear}
              book={book}
              highlight={inputValue}
            />
          </NavLink>
        );
      })}
    </div>
  );
};

// const dispatch = useDispatch();

// useEffect(() => {
//   const getUsers = async () => {
//     await axios
//       .get('https://strapi.cleverland.by/api/books')
//       .then((response) => {
//         dispatch(setAllBooks(response));
//       })
//       .catch((error) => `There is the ${error}`);
//   };

//   getUsers();
// }, [dispatch]);
