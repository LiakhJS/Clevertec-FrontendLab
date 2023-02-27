// import { useState } from 'react';
import { useDispatch,useSelector  } from 'react-redux';
import classNames from 'classnames';

import { ReactComponent as Tiles } from '../../images/active_block.svg';
import { ReactComponent as List } from '../../images/active_list.svg';
import { ReactComponent as Cross } from '../../images/cross.svg';
import { setInputValue , setIsSearchOpened , setSortByDesc } from '../../redux/books';

import './nav-list.css';

export const NavList = ({ isFormOfTiles, isFormOfList, setisFormOfList, setIsFormOfTiles }) => {
  // const [isSearchOpened, setIsSearchOpened] = useState(false);
  // const openSearch = () => {
  //   setIsSearchOpened(true);
  // };
  // const closeSearch = () => {
  //   setIsSearchOpened(false);
  // };
  const isSearchOpened = useSelector((state) => state.books.isSearchOpened);
  const dispatch = useDispatch();
  const openSearch = () => {
    dispatch(setIsSearchOpened(true));
  };
  const closeSearch = () => {
    dispatch(setIsSearchOpened(false));
  };

  const checkFormOfTiles = () => {
    setIsFormOfTiles(!isFormOfTiles);
    setisFormOfList(!isFormOfList);
  };
  const checkFormOfList = () => {
    setisFormOfList(!isFormOfList);
    setIsFormOfTiles(!isFormOfTiles);
  };
  
  

  const inputValue = useSelector((state) => state.books.inputValue);
  const setInputValueFunction = (e) => {
    dispatch(setInputValue(e.target.value));
  };
  
  const isSortByDesc = useSelector((state) => state.books.isSortByDesc);
  const toggleSortByDesc =  () => {
    dispatch(setSortByDesc(!isSortByDesc));
  };

  return (
    <div className='nav-list'>
      <div className={classNames('nav-list__inputs', { searchIsOpened: isSearchOpened })}>
        <Cross
          data-test-id='button-search-close'
          fill='orange'
          stroke='orange'
          color='orange;'
          onClick={closeSearch}
          className={classNames('close', { searchIsOpened: isSearchOpened })}
        />
        <input
          data-test-id={isSearchOpened ? 'input-search' : 'button-search-open'}
          type='text'
          placeholder='Поиск книги или автора'
          className={classNames('nav-list__search mobile', { searchIsOpened: isSearchOpened })}
          onClick={openSearch}
          onChange={setInputValueFunction}
          value={inputValue}
          id='search'
          name='search'
        />

        <input
          type='button'
          value='По рейтингу'
          onClick={toggleSortByDesc}
          className={classNames('nav-list__filter mobile', { searchIsOpened: isSearchOpened })}
          name='filter'
        />
      </div>
      <div className={classNames('nav-list__forms', { searchIsOpened: isSearchOpened })}>
        <div
          className={isFormOfTiles ? 'forms_form-of-tiles tiles' : 'forms_form-of-tiles'}
          onClick={checkFormOfTiles}
          onKeyDown={checkFormOfTiles}
          role='presentation'
          data-test-id='button-menu-view-window'
        >
          <Tiles
            fill='#A7A7A7;'
            stroke='#A7A7A7;'
            color='#A7A7A7;'
            width='19'
            height='19'
            className={isFormOfTiles ? 'tiles' : null}
          />
        </div>
        <div
          className={isFormOfList ? 'forms_form-of-list list' : 'forms_form-of-list'}
          onClick={checkFormOfList}
          onKeyDown={checkFormOfList}
          role='presentation'
          data-test-id='button-menu-view-list'
        >
          <List
            fill='#A7A7A7;'
            stroke='#A7A7A7;'
            color='#A7A7A7;'
            width='19'
            height='19'
            className={isFormOfList ? 'list' : null}
          />
        </div>
      </div>
    </div>
  );
};
