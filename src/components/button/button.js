


// import './button.css';

// export const Button = ({ booking, delivery, isFormOfList }) => {



//   let buttonText;
//   let buttonClassName;

//   if (booking?.order) {
//     buttonText = 'ЗАБРОНИРОВАНА';
//     buttonClassName = 'reserv-btn ordered';
//   }
//   if (delivery?.handed) {
//     const bookDate = new Date(delivery.dateHandedTo);
//     const bookDay = new Intl.DateTimeFormat('en', {
//       'day': '2-digit'
//     }).format(bookDate);
//     const bookMonth = new Intl.DateTimeFormat('en', {
//       'month': '2-digit'
//     }).format(bookDate);

//     buttonText = `ЗАНЯТА ДО ${bookDay}.${bookMonth}`;
//     buttonClassName = 'reserv-btn reserved';
//   }
//   if (!booking && !delivery) {
//     buttonText = 'ЗАБРОНИРОВАТЬ';
//     buttonClassName = 'reserv-btn';
//   }

//   return (<div className={isFormOfList ? 'btn-wrapper inColumn mobile book-card' : 'btn-wrapper mobile book-card'}>
//     <button type='button' className={buttonClassName}>{buttonText}</button>
//   </div>);
// }

// import './button.css';

// export const Button = ({ card, isFormOfList, children }) => (
//     <div className={isFormOfList ? 'btn-wrapper inColumn mobile book-card' : 'btn-wrapper mobile book-card'}>
//         <button type='button' className={children === 'оценить книгу' ? 'reserv-btn' : (card.reserved === 'true' && card.reservedDate === 'забронирована' ? 'reserv-btn reserved' : (card.reserved === 'true' ? 'reserv-btn ordered' : 'reserv-btn'))}>
//             {children === 'оценить книгу' ? 'оценить книгу' : card.reservedDate}
//         </button>
//     </div>
// );





import './button.css';

export const Button = ({ booking, delivery, isFormOfList, bookPageisActive }) => (
  <div className={isFormOfList ? 'btn-wrapper inColumn mobile book-card' : 'btn-wrapper mobile book-card'}>
    <button type='button' className={ booking
    ? 'reserv-btn reserved' : 
    (delivery  ? 
    'reserv-btn ordered' : 'reserv-btn')}>
      {bookPageisActive ? 'оценить книгу' : (delivery  || booking ?  'забронирована' : 'забронировать')  }
    </button>
  </div>
);