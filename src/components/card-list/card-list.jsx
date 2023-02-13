// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import axios from 'axios';

import { store } from '../../redux';
import { setAllBooks } from '../../redux/books';
import { Card } from '../card/card';
import { cards } from '../utils';

import './card-list.css';

export const CardList = ({ isFormOfList, setCurrentBook, currentBook }) => {

  const thunkFunction =  (dispatch) => {
      axios
        .get('https://strapi.cleverland.by/api/books')
        .then((response) => {
          dispatch(setAllBooks(response));
        })
        .catch((error) =>  document.write(error));
    };

  store.dispatch(thunkFunction);

  return (
    <div className={isFormOfList ? 'card-list inColumn mobile' : 'card-list mobile'}>
      {cards.map((item) => (
        <Card
          isFormOfList={isFormOfList}
          card={item}
          key={item.id}
          setCurrentBook={setCurrentBook}
          currentBook={currentBook}
        />
      ))}
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
  