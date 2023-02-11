import { ReactComponent as Star } from '../../images/star.svg';

import './start-rating.css';

export const StarRating = ({ isFormOfList }) => (
  <div className={isFormOfList ? 'card_stars inColumn mobile' : 'card_stars mobile'}>
    <Star fill='#FFBC1F' className='star' />
    <Star fill='#FFBC1F' className='star' />
    <Star fill='#FFBC1F' className='star' />
    <Star fill='#FFBC1F' className='star' />
    <Star fill='none' className='empty-star' />
  </div>
);
