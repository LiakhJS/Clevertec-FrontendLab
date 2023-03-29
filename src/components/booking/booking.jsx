import { useState } from 'react';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ReactComponent as Cross } from '../../images/cross.svg';
import { setIsOpenedCalendar } from '../../redux/booking';
import { getBooksThunk } from '../../redux/books';
import { getCategoriesThunk } from '../../redux/categories';
import { Button } from '../button';

import '../book-rating/book-rating.css';
import './booking.css';

export const Booking = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const currentUser = Cookies.get('currentUser');
  const currentBook = useSelector((state) => state.book.book.id);
  const currentBookM = useSelector((state) => state.book.book);

  const closeCalendar = () => {
    dispatch(setIsOpenedCalendar(false));
  }

  const BASE_URL = 'https://strapi.cleverland.by';
  const instance = axios.create({
    withCredentials: true,
    baseURL: `${BASE_URL}`,
  });

  instance.interceptors.request.use((config) => {
    const JWTToken = Cookies.get('token');

    if (JWTToken) {
      config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
    }

    return config;
  });


  const reserveBook = async () => {
    if (date) {
      const dateFormat = new Date(date);

      dateFormat.setHours(dateFormat.getHours() + 3);
      if (currentBookM.booking === null) {
        instance.post('/api/bookings', {
          data: {
            'order': true,
            'dateOrder': dateFormat.toISOString(),
            'book': currentBook.toString(),
            'customer': currentUser.toString()
          }
        }).then((res) => {
          dispatch(setIsOpenedCalendar(false));
          dispatch(getBooksThunk(currentBook));
          dispatch(getCategoriesThunk());
          console.log(res.data)
        })
          .catch((err) => {
            console.log(err.name)
          })
      } else if (currentBookM.booking.customerId.toString() === currentUser) {
        instance.put(`/api/bookings/${currentBookM.booking.id}`, {
          data: {
            'order': true,
            'dateOrder': dateFormat.toISOString(),
            'book': currentBook.toString(),
            'customer': currentUser.toString()
          }
        }).then((res) => {
          dispatch(setIsOpenedCalendar(false));
          dispatch(getBooksThunk(currentBook));
          console.log(res.data)
        })
          .catch((err) => {
            console.log(err.name)
          })
      }
    }
  }

  return (
    <div className='container'>
      <div className="calendar-app">
        <div className="rate-cross">
          <Cross
            data-test-id='button-search-close'
            onClick={closeCalendar}
            className='rate-cross__icon'
          />
        </div>
        <h4>Выбор даты бронирования</h4>
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} />
        </div>
        <Button onClick={reserveBook} />
      </div>
    </div>
  )

}

