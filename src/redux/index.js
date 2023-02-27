// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { bookSlice } from './book';
import { booksSlice } from './books';
import { categoriesSlice } from './categories';
import { burgerSlice } from './reducer';

// const stringMiddleWare =()=> (next)=>(action)=> {
//     if(typeof action === 'string') {
// return next({type:action})
// }



// return next(action)
// }


export const store = configureStore({
  reducer: {
    burger: burgerSlice.reducer,
    book: bookSlice.reducer,
    books: booksSlice.reducer,
    categories:categoriesSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({

      serializableCheck: false,
    }),

});

