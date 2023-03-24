import {  useState } from 'react';
import Calendar from 'react-calendar';

import { ReactComponent as Cross } from '../../images/cross.svg';
import { Button } from '../button';

import '../book-rating/book-rating.css';
import './booking.css';

export const Booking = () => {
  const [date, setDate] = useState(new Date())


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
        <Calendar onChange={setDate} value={date} />
      </div>
      <Button />
    </div>
  </div>
)

}

