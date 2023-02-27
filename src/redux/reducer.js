

import { createSlice } from '@reduxjs/toolkit';

const burgerSlice = createSlice({
  name: 'burger',
  initialState: {
    isOpenedBurger: false,
    isArrowTransformed: false,
    isCommentsHidden: true,
    isActiveTreatyLink: false,
    isActiveTermsLink: false,
    isActiveGenre: true,
    isNotActiveShowCase: false,
    isHiddenGenres: false,
    activeCategory: 'all',
  },
  reducers: {
    changeBurgerState(state, action) {
      state.isOpenedBurger = action.payload;
    },
    rotateArrow(state, action) {
      state.isArrowTransformed = action.payload;
    },
    changeCommentsVisibility(state, action) {
      state.isCommentsHidden = action.payload;
    },
    setIsActiveTreatyLink(state, action) {
      state.isActiveTreatyLink = action.payload;
    },
    setIsActiveTermsLink(state, action) {
      state.isActiveTermsLink = action.payload;
    },
    setIsActiveGenre(state, action) {
      state.isActiveGenre = action.payload;
    },
    setIsActiveShowcase(state, action) {
      state.isNotActiveShowCase = action.payload;
    },
    setIsHiddenGenres(state, action) {
      state.isHiddenGenres = action.payload;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
  }
})

export { burgerSlice };
export const { changeBurgerState, changeCommentsVisibility, setIsActiveGenre, setIsActiveShowcase, setIsActiveTermsLink, setIsActiveTreatyLink, setIsHiddenGenres, rotateArrow, setActiveCategory } = burgerSlice.actions;


