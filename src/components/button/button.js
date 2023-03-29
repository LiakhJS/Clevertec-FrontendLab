
import Cookies from 'js-cookie';

import './button.css';

export const Button = ({ bookCancel, booking, delivery, isFormOfList, bookPageisActive, onClick, rebooking, disabled}) => {

  const currentUser = Cookies.get('currentUser');
  // first
  return (
    <div className={isFormOfList ? 'btn-wrapper inColumn mobile book-card' : 'btn-wrapper mobile book-card'}>
      <button disabled={disabled} type='button' onClick={onClick} className={(bookPageisActive || rebooking ? 'reserv-btn' : (booking === currentUser || bookCancel
        ? 'reserv-btn reserved' :
        (delivery || (booking !== null) ?
          'reserv-btn ordered' : 'reserv-btn')))}>
        {(bookCancel ? 'отменить бронь' : null) ||
          (bookPageisActive ? 'оценить книгу' : (delivery ? `занята до ${delivery}` : (rebooking ? 'забронировать' : (booking !== null ? 'забронирована' : 'забронировать'))))}
      </button>
    </div>





  );
}