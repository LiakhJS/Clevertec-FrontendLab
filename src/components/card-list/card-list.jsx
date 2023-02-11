import { Card } from '../card/card';
import { cards } from '../utils';

import './card-list.css';

export const CardList = ({ isFormOfList, setCurrentBook, currentBook }) => (
  <div className={isFormOfList ? 'card-list inColumn mobile' : 'card-list mobile'}>
    {cards.map((item) => (
      <Card
        isFormOfList={isFormOfList}
        card={item}
        key={item.id}
        setCurrentBook={setCurrentBook}
        currentBook={currentBook}
      />
    ))}
  </div>
);
