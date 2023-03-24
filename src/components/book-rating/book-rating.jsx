// import { useState } from 'react';

import { ReactComponent as Cross } from '../../images/cross.svg';
import { Button } from '../button';
import { StarRating } from '../star-rating';

import './book-rating.css';

export const BookRating = () => (
  <div className="book-rating__container">
    <div className="rate-cross">
      <Cross
        data-test-id='button-search-close'

        className='rate-cross__icon'
      />
    </div>
    <h1>Оцените книгу</h1>
    <div className='your-rate'>
      <span className='your-rate_rate'>Ваша оценка</span>
      <div className='your-rate_stars'>
        <StarRating />
      </div>
    </div>
    <textarea className='textarea-rate' placeholder='Оставить отзыв' />
    <Button />
  </div >
)

