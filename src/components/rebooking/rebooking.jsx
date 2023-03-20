import {  useState } from 'react';
import Calendar from 'react-calendar';
import { ReactComponent as Cross } from '../../images/cross.svg';

import { Button } from '../button';
import '../book-rating/book-rating.css';
import './rebooking.css';
import '../booking/booking.css';

export const Rebooking = () => {
  const [date, setDate] = useState(new Date())


return (
  <div className='container'>
    <div className="calendar-app rebooking">
    <div className="rate-cross">
      <Cross
        data-test-id='button-search-close'
        fill='#F83600'
        stroke='#F83600'
        color='#F83600'
        className='rate-cross__icon'
      />
      </div>
      <h4>Выбор даты бронирования</h4>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className='reserv-btns'>
      <Button />
            <Button bookCancel={true}/>
            </div>
    </div>
  </div>
)

}

