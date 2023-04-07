// import { getDefaultMiddleware } from '@reduxjs/toolkit';
// import logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit';

import { bookSlice } from './book';
import { bookingSlice } from './booking';
import { booksSlice } from './books';
import { categoriesSlice } from './categories';
import { bookCommentSlice } from './comment';
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
    categories:categoriesSlice.reducer,
    booking: bookingSlice.reducer,
    bookComment: bookCommentSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({

    //   serializableCheck: false,
    // }).concat(logger),

    getDefaultMiddleware({

      serializableCheck: false,
    })

});

