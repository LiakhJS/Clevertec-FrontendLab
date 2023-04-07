import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { getBookThunk } from '../../redux/book';
import { bookChangeCommentThunk, bookCommentThunk,setRateModalIsOpened  } from '../../redux/comment';
import { StarRatingModal } from '../star-rating-modal';

import './rate-modal.css';

export const RateModal = ({ book }) => {
  const dispatch = useDispatch();
  const bookId = book.id;
  const id = Number(Cookies.get('currentUser'));
  const commentId = book.comments.find((el) => (el.user.commentUserId === id));
  let isRating = true;
  let commentID = null;

  if (commentId === undefined) {
    isRating = false;
  } else {
    isRating = true;
    commentID = commentId.id;
  }
  console.log(commentId === undefined);
console.log(isRating);
console.log(commentID);



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
    }}));
    dispatch(getBookThunk(bookId));
    dispatch(setRateModalIsOpened(false));

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
        dispatch(getBookThunk(bookId));
    dispatch(setRateModalIsOpened(false));

  }
  const onChangeHandler = (e) => {
    setValue(e.target.value)
  }

  return (

    <div className='container__log'>
      <h3 className='cleverland-title'>Cleverland</h3>
      <form className='custom-form auth' noValidate={true} onSubmit={isRating ?  getChangeRating:  getRating}>
        <h4 className='custom-title'>Вход в личный кабинет</h4>
        <div className='comment__user_avatar'>
          <div className='comment__stars'>
            <StarRatingModal starsCount={starsCount} setStarsCount={setStarsCount} />
          </div>
        </div>
        <div className='comment__textarea-wrap'>
          <textarea className='comment__textarea-w' value={value}
            onChange={onChangeHandler} placeholder='Оставить отзыв' />
        </div>
        <div className='btn-and-link-to-auth-page'>

          <input type='submit' value={isRating?'изменить оценку':'оценить'} className={isRating ? 'reserv-btn reserved':'reserv-btn'} />
        </div>
      </form>
    </div>
  );
}

 //     <div className={styles.main}>
  //     <Modal content="rate">
  //         <div className={styles.content} >
  //             <div className={styles.title} data-test-id='modal-title'><h4>{status==='rate' ? 'Оцените книгу' : 'Хотите изменить оценку?'}</h4>
  //             </div>
  //             <RatingForModal getRating={getRating} count={count} modal={true}/>
  //             <textarea data-test-id='comment' className={styles.area} value={value}
  //                       onChange={onChangeHandler} placeholder='Оставить отзыв'/>
  //             <ButtonComment data-test-id=' button-comment' size='large' type='submit' name='оценить'
  //                     callBack={status==='rate' ? onClickButtonRateHandler : onClickButtonChangeRateHandler}/>
  //             <div className={styles.space}/>
  //         </div>
  //     </Modal>
  // </div>

