import './button.css';

export const Button = ({ card, isFormOfList, children }) => (
    <div className={isFormOfList ? 'btn-wrapper inColumn mobile book-card' : 'btn-wrapper mobile book-card'}>
        <button type='button' className={children === 'оценить книгу' ? 'reserv-btn' : (card.reserved === 'true' && card.reservedDate === 'забронирована' ? 'reserv-btn reserved' : (card.reserved === 'true' ? 'reserv-btn ordered' : 'reserv-btn'))}>
            {children === 'оценить книгу' ? 'оценить книгу' : card.reservedDate}
        </button>
    </div>
);
