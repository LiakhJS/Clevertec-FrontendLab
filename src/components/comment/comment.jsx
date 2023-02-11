import unknown from '../../images/unknown-user.png';
import { StarRating } from '../star-rating';

import './comment.css';

export const Comment = ({ comment }) => (
  <div className='comment'>
    <div className='comment__user'>
      <div className='comment__user_avatar'>
        <img src={comment.avatar === '' ? `${unknown}` : `${comment.avatar}`} alt={`${comment.avatar}`} />
      </div>
      <div className='comment__user_name'>{comment.user}</div>
      <div className='comment__user_date'>{comment.date}</div>
      <div className='user-name-and-date'>
        <div className='comment__user_name block'>{comment.user}</div>
        <div className='comment__user_date block'>{comment.date}</div>
      </div>
    </div>
    <div className='comment__stars'>
      <StarRating />
    </div>
    <div className={comment.comment === '' ? ' comment__text none' : 'comment__text'}>{comment.comment}</div>
  </div>
);
