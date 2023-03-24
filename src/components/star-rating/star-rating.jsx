import { ReactComponent as Star } from '../../images/star.svg';

import './start-rating.css';

export const StarRating = ({ isFormOfList, rating }) => {
  const starsRes = [];
  const maxStars = 5;

  for (let i = 0; i < maxStars; i++) {
    const star = i < rating ? <Star fill='#FFBC1F' className='star' key={i}/> : <Star fill='none' className='empty-star' key={i} />;

    starsRes.push(star);
  }

  return <div className={isFormOfList ? 'card_stars inColumn mobile' : 'card_stars mobile'}>{starsRes}</div>;
};
