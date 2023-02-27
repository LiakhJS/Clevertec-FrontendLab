import unknown from '../../images/unknown-user.png';
import { StarRating } from '../star-rating';

import './comment.css';

export const Comment = ({ comment }) => (
  <div className='comment'>
    <div className='comment__user'>
      <div className='comment__user_avatar'>
        <img src={comment.user.avatarUrl === null ? `${unknown}` : `${comment.user.avatarUrl}`} alt='user-avatar' />
      </div>
      <div className='comment__user_name'>{ `${comment.user.firstName} ${comment.user.lastName}`}</div>
      <div className='comment__user_date'>{comment.createdAt}</div>
      <div className='user-name-and-date'>
        <div className='comment__user_name block'>{`${comment.user.firstName} ${comment.user.lastName}`}</div>
        <div className='comment__user_date block'>{comment.createdAt}</div>
      </div>
    </div>
    <div className='comment__stars'>
      <StarRating rating={comment.rating}/>
    </div>
    <div className={comment.text === null ? ' comment__text none' : 'comment__text'}>{comment.text}</div>
  </div>
);
