// import { NavLink } from 'react-router-dom';

// import React from 'react';

import coverEmpty from '../../images/cat.png';
import { BookTitle } from '../book-title';
import { Button } from '../button';
import { StarRating } from '../star-rating';
import { host } from '../utils';

import './card.css';

export const Card = ({ isFormOfList, image, authors, title, booking, delivery, rating, highlight }) => {
  const imageSrc = image ? `${host}${image.url}` : coverEmpty;

  // const getHighlightedText = (text, higlight) => {
  //   const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  //   return parts.map((part) => (
  //     <div className={isFormOfList ? 'card_name inColumn mobile' : 'card_name mobile'}>
  //       {part.toLowerCase() === higlight.toLowerCase() ? (
  //         <span style={{ backgroundColor: '#e8bb49' }}>{part}</span>
  //       ) : (
  //         <span>{part}</span>
  //       )}
  //     </div>
  //   ));
  // };

  return (
    <div className={isFormOfList ? 'card inColumn mobile' : 'card mobile'} data-test-id='card' role='presentation'>
      {/* <NavLink to={`/book/${category}/${id}`}> */}
      <div className={isFormOfList ? 'card_cover inColumn mobile' : 'card_cover mobile'}>
        <img src={imageSrc} alt='cover-book' />
      </div>
      {isFormOfList ? <div className='card_stars none' /> : <StarRating rating={rating} />}
      <BookTitle isFormOfList={isFormOfList} text={title} highlight={highlight}/>
      <div className={isFormOfList ? 'card_author inColumn mobile' : 'card_author mobile'}>{authors}</div>
      {isFormOfList ? (
        <div className={isFormOfList ? 'card__rate-and-btn mobile' : 'card__rate-and-btn none mobile'}>
          <StarRating rating={rating} isFormOfList={isFormOfList} />
          <Button booking={booking} delivery={delivery} isFormOfList={isFormOfList} />
        </div>
      ) : (
        <Button booking={booking} delivery={delivery} isFormOfList={isFormOfList} />
      )}
      {/* </NavLink> */}
    </div>
  );
};
