// import { NavLink } from 'react-router-dom';

// import React from 'react';

import { useDispatch  } from 'react-redux';

import coverEmpty from '../../images/cat.png';
import { getBookThunk } from '../../redux/book';
import { setIsOpenedCalendar } from '../../redux/booking';
import { BookTitle } from '../book-title';
// import { Booking } from '../booking';
import { Button } from '../button';
import { StarRating } from '../star-rating';
import { host } from '../utils';

// import { Dispatch } from 'react';
import './card.css';

export const Card = ({ isFormOfList, image, authors, title, booking, delivery, rating, highlight,id }) => {
  const imageSrc = image ? `${host}${image.url}` : coverEmpty;
const dispatch = useDispatch();

  // const isCalendarOpened = useSelector((state)=> state.booking.isCalendarOpened);
  const openCalendar = (e) => {
    e.preventDefault();
    // e.stopPropagation();  
    dispatch(getBookThunk(Number(id))); 
dispatch(setIsOpenedCalendar(true));

  }

  return (
    <div className={isFormOfList ? 'card inColumn mobile' : 'card mobile'} data-test-id='card' role='presentation'>
      {/* <NavLink to={`/book/${category}/${id}`}> */}
      <div className={isFormOfList ? 'card_cover inColumn mobile' : 'card_cover mobile'}>
        <img src={imageSrc} alt='cover-book' />
      </div>
      {isFormOfList ? <div className='card_stars none' /> : <StarRating rating={rating} />}
      <BookTitle isFormOfList={isFormOfList} text={title} highlight={highlight} />
      <div className={isFormOfList ? 'card_author inColumn mobile' : 'card_author mobile'}>{authors}</div>
      {isFormOfList ? (
        <div className={isFormOfList ? 'card__rate-and-btn mobile' : 'card__rate-and-btn none mobile'}>
          <StarRating rating={rating} isFormOfList={isFormOfList} />
          <Button booking={booking} delivery={delivery} isFormOfList={isFormOfList} onClick={openCalendar} />
        </div>
      ) : (
        <Button booking={booking} delivery={delivery} isFormOfList={isFormOfList} onClick={openCalendar}/>
      )}
      {/* </NavLink> */}
    </div>
  );
};
