import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core';

import { ReactComponent as CommentArrow } from '../../images/arrow-down.svg';
import { changeCommentsVisibility } from '../../redux/reducer';
import { Breadcrumbs } from '../breadcrumbs';
import { Button } from '../button';
import { Comment } from '../comment';
import { Error } from '../error';
import { Loader } from '../loader';
import { StarRating } from '../star-rating';
import { host } from '../utils';

import './book.css';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

export const Book = ({ bookData, bookStatusLoading }) => {
  const { category } = useParams();
  const bookPageisActive = true;
  const dispatch = useDispatch();
  const booksCategories = useSelector((state) => state.categories.categories);
  const currentCategory = booksCategories.find((categ) => categ.path.toLowerCase() === category);
  const isCommentsHidden = useSelector((state) => state.burger.isCommentsHidden);
  const toggleCommentsVisibility = () => (  bookData.comments===null?null :dispatch(changeCommentsVisibility(!isCommentsHidden)));

  // book.path === category ? 'active' : ''} onClick={() => setActiveCategory(category)} 
  return (
    <div className='book'>
      {bookStatusLoading === 'loading' && <Loader />}
      {bookStatusLoading === 'failed' && <Error />}
      {bookStatusLoading === 'resolved' && (
        <React.Fragment>
          <Breadcrumbs bookData={bookData} category={currentCategory} />
          <div className='book__card '>
            <div className='book__card_img grid-content swiper1-2'>
              <img src={`${host}${bookData.images[0].url}`} alt='one-book' />
            </div>
            <div className='book__card_i grid-content'>
              <h3 className=' book__card_i_title '>{bookData.title}</h3>
              <div className=' book__card_i_author  '>{bookData.authors}</div>
              <Button  delivery = {bookData.delivery !== null ? bookData.delivery.dateHandedTo : null}
              booking = {bookData.booking !== null ? bookData.booking.customerId.toString() : null} />
            </div>
            <div className='book__card_about grid-content'>
              <h3>О книге</h3>
              <span>
            {bookData.description}
              </span>
            </div>
          </div>
          <div className='book__card_rating'>
            <h5>Рейтинг</h5>
            {bookData.rating > 0 ? (
              <div className='book__card_rating_inline'>
                <StarRating rating={bookData.rating} />
                <span>{bookData.rating}</span>
              </div>
            ) : (
              <div className='book__card_rating_inline empty-stars'>
                <StarRating rating={bookData.rating} />
                <div className='book__card_rating_stars mobile'>{bookData.rating}</div>
              </div>
            )}
          </div>
          <div className='book__in-depth '>
            <h5>О книге</h5>
            <div className='book__in-depth_i '>
              <div className='book__in-depth_i_col'>
                <ul>
                  <li>
                    <div>Издательство</div>
                    <div>{bookData.publish}</div>
                  </li>
                  <li>
                    <div>Год издания</div>
                    <div>{bookData.issueYear}</div>
                  </li>
                  <li>
                    <div>Страниц</div>
                    <div>{bookData.pages}</div>
                  </li>
                  <li>
                    <div>Переплёт</div>
                    <div>{bookData.cover}</div>
                  </li>
                  <li>
                    <div>Формат</div>
                    <div>{bookData.format}</div>
                  </li>
                </ul>
              </div>
              <div className='book__in-depth_i_col'>
                <ul>
                  <li>
                    <div>Жанр</div>
                    <div>{bookData.categories}</div>
                  </li>
                  <li>
                    <div>Вес</div>
                    <div>{bookData.weight} г</div>
                  </li>
                  <li>
                    <div>ISBN</div>
                    <div>{bookData.ISBN}</div>
                  </li>
                  <li>
                    <div>Изготовитель</div>
                    <div>{bookData.producer}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={classNames('book__card_comments', { hiddenComments: isCommentsHidden })}>
            <div className='book__card_comments_title' role='presentation' onClick={toggleCommentsVisibility}>
              <h5>
                Отзывы <span>{bookData.comments === null ? '0' : bookData.comments.length}</span>
                {bookData.comments===null?null :
                <CommentArrow
                  data-test-id='button-hide-reviews'
                  role='presentation'
                  onClick={toggleCommentsVisibility}
                  color='#363636'
                  fill='#363636'
                  stroke='#363636'
                  className={classNames('commentArrow', { arrowTrasformation: !isCommentsHidden })}
                />}
              </h5>
            </div>
            <div className={classNames('comments', { hidden: isCommentsHidden })}>
              {bookData.comments === null
                ? null
                : bookData.comments.map((item) => <Comment comment={item} key={item.id} />)}
            </div>
            <div className='book__card_rate-btn'>
              <Button data-test-id='button-rating' card={bookData} bookPageisActive={bookPageisActive}>
                оценить книгу
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
