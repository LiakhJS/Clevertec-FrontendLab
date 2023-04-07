

import { ReactComponent as Star } from '../../images/star.svg';


export const StarRatingModal = ({starsCount,setStarsCount}) => {
  const starsRes = [];
  const maxStars = 5;


  
  const onClickHandler = (rate) => {
setStarsCount(rate);
  }

  for (let i = 0; i < maxStars; i++) {
    const star = i < starsCount ? <Star fill='#FFBC1F' className='star' key={i} onClick={() => onClickHandler(i + 1)} />
      : <Star fill='none' className='empty-star' key={i} onClick={() => onClickHandler(i + 1)} />;

    starsRes.push(star);
  }

  return <div className='card_stars mobile'>{starsRes.map((rateResult) => rateResult)}</div>

};
 