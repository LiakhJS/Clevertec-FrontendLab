import { useState } from 'react';

import { CardList } from '../card-list';
import { NavList } from '../nav-list';

import './content.css';

export const Content = () => {
  const [isFormOfList, setisFormOfList] = useState(false);
  const [isFormOfTiles, setIsFormOfTiles] = useState(true);

  return (
    <div className='content mobile'>
      <NavList
        isFormOfList={isFormOfList}
        setisFormOfList={setisFormOfList}
        isFormOfTiles={isFormOfTiles}
        setIsFormOfTiles={setIsFormOfTiles}
      />
      <CardList isFormOfList={isFormOfList} isFormOfTiles={isFormOfTiles} />
    </div>
  );
};
