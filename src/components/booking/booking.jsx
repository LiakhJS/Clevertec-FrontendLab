import {  useState } from 'react';
import Calendar from 'react-calendar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';

import { ReactComponent as Cross } from '../../images/cross.svg';
import { Button } from '../button';

import '../book-rating/book-rating.css';
import './booking.css';

export const Booking = () => {
  const [date, setDate] = useState(new Date());
  const bookingDate = moment(date).format();
const currentUser = Cookies.get('currentUser');
const currentBook = useSelector((state) => state.book.book.id);

  const baseUrl = 'https://strapi.cleverland.by/api/bookings';

  const reserveBook = async () => {
      await axios
              .post(baseUrl, {
                  'order': 'true',
                  'dateOrder': bookingDate,
                  'book': String(currentBook),
                  'customer': currentUser
                
              }  
              ).then((data) => {
                  console.log(data)                           
              }).catch((err) => {
                  console.log(err);
              })
  }


return (
  <div className='container'>
    <div className="calendar-app">
    <div className="rate-cross">
      <Cross
        data-test-id='button-search-close'

        className='rate-cross__icon'
      />
      </div>
      <h4>Выбор даты бронирования</h4>
      <div className="calendar-container">
        <Calendar  onChange={setDate} value={date} />
      </div>
      <Button onClick={reserveBook} />
    </div>
  </div>
)

}

