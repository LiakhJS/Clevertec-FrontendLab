import unknown from '../../images/unknown-user.png';
import { StarRating } from '../star-rating';

import './comment.css';

export const Comment = ({ comment }) => {



  const dateIso = `${comment.createdAt}`;
  
  const commentDate = new Date(dateIso).toLocaleString();

return(
  <div className='comment'>
    <div className='comment__user'>
      <div className='comment__user_avatar'>
        <img src={comment.user.avatarUrl === null ? `${unknown}` : `${comment.user.avatarUrl}`} alt='user-avatar' />
        
        {/* <img src={comment.user.avatarUrl?`${HOST}${comment.user.avatarUrl}`:user} alt="user" className={styles.userAva}/> */}
      </div>
      <div className='comment__user_name'>{ `${comment.user.firstName} ${comment.user.lastName}`}</div>
      <div className='comment__user_date'>{commentDate}</div>
      <div className='user-name-and-date'>
        <div className='comment__user_name block'>{`${comment.user.firstName} ${comment.user.lastName}`}</div>
        <div className='comment__user_date block'>{commentDate}</div>
      </div>
    </div>
    <div className='comment__stars'>
      <StarRating rating={comment.rating}/>
    </div>
    <div className={comment.text === null ? ' comment__text none' : 'comment__text'}>{comment.text}</div>
  </div>
);
}
