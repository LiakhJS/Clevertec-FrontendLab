import { NavLink } from 'react-router-dom';

import coverEmpty from '../../images/cat.png';
import { Button } from '../button';
import { StarRating } from '../star-rating';

import './card.css';

export const Card = ({ card, isFormOfList }) => {
  const checkActiveBook = () => {
    localStorage.setItem('activeBook', JSON.stringify(card));
  };

  return (
    <div
      className={isFormOfList ? 'card inColumn mobile' : 'card mobile'}
      data-test-id='card'
      onClick={checkActiveBook}
      onKeyDown={checkActiveBook}
      role='presentation'
    >
      <NavLink to={`/book/${card.title}`}>
        <div className={isFormOfList ? 'card_cover inColumn mobile' : 'card_cover mobile'}>
          <img src={card.cover === '' ? coverEmpty : card.cover} alt={`${card.cover}`} />
        </div>
        {isFormOfList ? (
          <div className='card_stars none'>{card.stars}</div>
        ) : card.stars === '' ? (
          <StarRating />
        ) : (
          <div className='card_stars mobile'>{card.stars}</div>
        )}
        <div className={isFormOfList ? 'card_name inColumn mobile' : 'card_name mobile'}>{card.title}</div>
        <div className={isFormOfList ? 'card_author inColumn mobile' : 'card_author mobile'}>{card.author}</div>
        {isFormOfList ? (
          <div className={isFormOfList ? 'card__rate-and-btn mobile' : 'card__rate-and-btn none mobile'}>
            {card.stars === '' ? (
              <StarRating isFormOfList={isFormOfList} />
            ) : (
              <div className='card_stars inColumn mobile'>{card.stars}</div>
            )}
            <Button card={card} isFormOfList={isFormOfList} />
          </div>
        ) : (
          <Button card={card} isFormOfList={isFormOfList} />
        )}
      </NavLink>
    </div>
  );
};
