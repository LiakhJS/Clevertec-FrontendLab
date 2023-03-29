import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import coverEmpty from '../../images/cat.png';
import { getBookThunk } from '../../redux/book';
import { setIsOpenedCalendar } from '../../redux/booking';
import { BookTitle } from '../book-title';
import { Button } from '../button';
import { StarRating } from '../star-rating';

import { host } from '../utils';

import './card.css';

export const Card = ({ isFormOfList, image, authors, title, rating, highlight, id, bookingCurrentUser, deliveryDate }) => {
  const imageSrc = image ? `${host}${image.url}` : coverEmpty;
  const dispatch = useDispatch();
  const currentUser = Cookies.get('currentUser');
  const openCalendar = (e) => {
    e.preventDefault();
    dispatch(getBookThunk(Number(id)));
    dispatch(setIsOpenedCalendar(true));
  }
console.log(bookingCurrentUser);
  return (
    <div className={isFormOfList ? 'card inColumn mobile' : 'card mobile'} data-test-id='card' role='presentation'>
      <div className={isFormOfList ? 'card_cover inColumn mobile' : 'card_cover mobile'}>
        <img src={imageSrc} alt='cover-book' />
      </div>
      {isFormOfList ? <div className='card_stars none' /> : <StarRating rating={rating} />}
      <BookTitle isFormOfList={isFormOfList} text={title} highlight={highlight} />
      <div className={isFormOfList ? 'card_author inColumn mobile' : 'card_author mobile'}>{authors}</div>
      {isFormOfList ? (
        <div className={isFormOfList ? 'card__rate-and-btn mobile' : 'card__rate-and-btn none mobile'}>
          <StarRating rating={rating} isFormOfList={isFormOfList} />
          <Button disabled={deliveryDate !== null || (bookingCurrentUser !==  null &&   bookingCurrentUser !== currentUser )? true : false}  booking={bookingCurrentUser} delivery={deliveryDate} isFormOfList={isFormOfList} onClick={openCalendar} />
        </div>
      ) : (
        <Button disabled={deliveryDate !== null || (bookingCurrentUser !==  null &&   bookingCurrentUser !== currentUser )? true : false} booking={bookingCurrentUser} delivery={deliveryDate} isFormOfList={isFormOfList} onClick={openCalendar} />
      )}
    </div>
  );
};
