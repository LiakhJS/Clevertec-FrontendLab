
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { ReactComponent as Cross } from '../../images/cross.svg';
import { getBookThunk } from '../../redux/book';
import { bookChangeCommentThunk, bookCommentThunk, setRateModalIsOpened } from '../../redux/comment';
import { StarRatingModal } from '../star-rating-modal';

import './book-rating.css';

export const BookRating = ({ book, isCurrentUserComment, setIsCurrentUserComment }) => {

  const dispatch = useDispatch();
  const bookId = book.id;
  const id = Number(Cookies.get('currentUser'));
  const commentId = book.comments.find((el) => (el.user.commentUserId === id));
const [commentID, setCommentID] =useState(null);
  // let commentID = null;
useEffect(()=> {
  if (commentId === undefined) {
    setIsCurrentUserComment(false);
  } else {
    setIsCurrentUserComment(true);
    setCommentID(commentId.id);
  }
},[])
 
 








  const [starsCount, setStarsCount] = useState(0);
  const [value, setValue] = useState('');

  const getRating = () => {
    dispatch(bookCommentThunk({
      data: {
        'data': {
          'rating': starsCount.toString(),
          'text': value,
          'user': id,
          'book': bookId.toString(),
        },
      }
    }));
  setTimeout(()=> {    dispatch(getBookThunk(Number(bookId)));
    dispatch(setRateModalIsOpened(false));

  },1000)


  }

  const getChangeRating = () => {

    dispatch(bookChangeCommentThunk({
      data: {
        'data': {
          'rating': starsCount.toString(),
          'text': value,
          'user': id.toString(),
          'book': bookId.toString(),
        },
      }, commentID
    }
    ));
    setTimeout(()=> {
      dispatch(setRateModalIsOpened(false));
      dispatch(getBookThunk(Number(bookId)));

    },1000)


  }
  const onChangeHandler = (e) => {
    setValue(e.target.value)
  }
  const closeModalBookRate = () => {
    dispatch(setRateModalIsOpened(false));

  }

  return (
    <div className='container'>
      <div className="book-rating">
        <form className="book-rating__container" noValidate={true} onSubmit={isCurrentUserComment ? getChangeRating : getRating}>
          <div className="rate-cross">
            <Cross
              data-test-id='button-search-close'
              onClick={closeModalBookRate}
              className='rate-cross__icon'
            />
          </div>
          <h1>Оцените книгу</h1>
          <div className='your-rate'>
            <span className='your-rate_rate'>Ваша оценка</span>
            <div className='your-rate_stars'>
              <StarRatingModal starsCount={starsCount} setStarsCount={setStarsCount} />
            </div>
          </div>
          <textarea className='textarea-rate' value={value}
            onChange={onChangeHandler} placeholder='Оставить отзыв' />
          <div className='btn-and-link-to-auth-page'>

            <input type='submit' value={isCurrentUserComment ? 'изменить оценку' : 'оценить'} className={isCurrentUserComment ? 'reserv-btn reserved' : 'reserv-btn'} />
          </div>
        </form>
      </div>
    </div>
  )

}