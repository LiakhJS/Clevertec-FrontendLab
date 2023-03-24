import '../card-list/card-list.css';
import './no-books-found.css';

export const NoBooksFound = ({ booksByCatNoFound, booksBySearchAndSortNotFound }) =>
  booksByCatNoFound ? (
    <p className='main-page__no-cards'>В этой категории книг ещё нет</p>
  ) : booksBySearchAndSortNotFound ? (
    <p className='main-page__no-cards'>По запросу ничего не найдено</p>
  ) : null;
