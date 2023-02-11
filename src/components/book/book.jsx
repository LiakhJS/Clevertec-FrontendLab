import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReactComponent as CommentArrow } from '../../images/arrow-down.svg';
import coverEmpy from '../../images/cat.png';
import { changeCommentsVisibility } from '../../redux/reducer';
import { Breadcrumbs } from '../breadcrumbs';
import { Button } from '../button';
import { Comment } from '../comment';
import { StarRating } from '../star-rating';

import './book.css';

import 'swiper/css';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination, Scrollbar]);

export const Book = () => {
  const activeBook = JSON.parse(localStorage.getItem('activeBook'));
  const dispatch = useDispatch();
  const isCommentsHidden = useSelector((state) => state.burger.isCommentsHidden);
  const toggleCommentsVisibility = () => {
    dispatch(changeCommentsVisibility(!isCommentsHidden));
  };
  const [covers] = [activeBook.covers];

  const pagination1 = {
    clickable: true,
    dynamicBullets: true,
    bulletActiveClass: 'swiper-pagination-bullet-active',
    dynamicMainBullets: 2,

    renderBullet(index, className) {
      return `<span class="${className}" style="background-image:url(${covers[index]});"></span>`;
    },
  };
  const pagination2 = {
    clickable: true,
    dynamicBullets: false,
    bulletActiveClass: 'swiper-pagination-bullet-active',
    renderBullet(index, className) {
      return `<span class="${className}"  data-test-id="" style="background-image:none;"></span>`;
    },
  };

  return (
    <div className='book'>
      <Breadcrumbs />
      <div className='book__card '>
        <div className='book__card_img grid-content swiper1-2'>
          <Swiper
            data-test-id='slide-big'
            pagination={pagination1}
            modules={[Pagination, Scrollbar]}
            centeredSlides={true}
            slidesPerView={1}
            initialSlide={2}
            className='mySwiper swiper1'
          >
            {activeBook.covers.length === 0 ? (
              <SwiperSlide data-test-id='' key='coverEmpty1'>
                <img src={`${coverEmpy}`} alt={`${activeBook.title}`} />
              </SwiperSlide>
            ) : activeBook.covers.length === 1 ? (
              <SwiperSlide data-test-id='' key='cover1'>
                <img src={`${activeBook.cover}`} alt={`${activeBook.title}`} />
              </SwiperSlide>
            ) : (
              activeBook.covers.map((item) => (
                <SwiperSlide data-test-id='' key={Math.random()}>
                  <img src={item} alt={item} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
          <Swiper
            data-test-id='slide-big'
            pagination={pagination2}
            modules={[Pagination, Scrollbar]}
            centeredSlides={true}
            slidesPerView={1}
            className='mySwiper swiper2'
          >
            {activeBook.covers.length === 0 ? (
              <SwiperSlide data-test-id='' key='coverEmpty1'>
                <img src={`${coverEmpy}`} alt={`${activeBook.title}`} />
              </SwiperSlide>
            ) : activeBook.covers.length === 1 ? (
              <SwiperSlide data-test-id='' key='cover1'>
                <img src={`${activeBook.cover}`} alt={`${activeBook.title}`} />
              </SwiperSlide>
            ) : (
              activeBook.covers.map((item) => (
                <SwiperSlide data-test-id='' key={Math.random()}>
                  <img src={item} alt={item} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>

        <div className='book__card_i grid-content'>
          <h3 className=' book__card_i_title '>{activeBook.title}</h3>
          <div className=' book__card_i_author  '>{activeBook.author}</div>
          <Button card={activeBook} />
        </div>
        <div className='book__card_about grid-content'>
          <h3>О книге</h3>
          <span>
            Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
            решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
            изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
            время?
          </span>
          <span>
            Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
            алгоритмы — это веселое и увлекательное занятие.
          </span>
        </div>
      </div>
      <div className='book__card_rating'>
        <h5>Рейтинг</h5>
        {activeBook.stars === '' ? (
          <div className='book__card_rating_inline'>
            <StarRating />
            <span>4.3</span>
          </div>
        ) : (
          <div className='book__card_rating_inline empty-stars'>
            <StarRating />
            <div className='book__card_rating_stars mobile'>{activeBook.stars}</div>
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
                <div>Питер</div>
              </li>
              <li>
                <div>Год издания</div>
                <div>2019</div>
              </li>
              <li>
                <div>Страниц</div>
                <div>288</div>
              </li>
              <li>
                <div>Переплёт</div>
                <div>Мягкая обложка</div>
              </li>
              <li>
                <div>Формат</div>
                <div>70х100</div>
              </li>
            </ul>
          </div>
          <div className='book__in-depth_i_col'>
            <ul>
              <li>
                <div>Жанр</div>
                <div>Компьютерная литератур</div>
              </li>
              <li>
                <div>Вес</div>
                <div>370 г</div>
              </li>
              <li>
                <div>ISBN</div>
                <div>978-5-4461-0923-4</div>
              </li>
              <li>
                <div>Изготовитель</div>
                <div>ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29 </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={classNames('book__card_comments', { hiddenComments: isCommentsHidden })}>
        <div className='book__card_comments_title' role='presentation' onClick={toggleCommentsVisibility}>
          <h5>
            Отзывы <span>{activeBook.comments.length}</span>{' '}
            <CommentArrow
              data-test-id='button-hide-reviews'
              role='presentation'
              onClick={toggleCommentsVisibility}
              color='#363636'
              fill='#363636'
              stroke='#363636'
              className={classNames('commentArrow', { arrowTrasformation: !isCommentsHidden })}
            />
          </h5>
        </div>
        <div className={classNames('comments', { hidden: isCommentsHidden })}>
          {activeBook.comments.map((item) => (
            <Comment comment={item} key={item.id} />
          ))}
        </div>
        <div className='book__card_rate-btn'>
          <Button data-test-id='button-rating' card={activeBook}>
            оценить книгу
          </Button>
        </div>
      </div>
    </div>
  );
};
