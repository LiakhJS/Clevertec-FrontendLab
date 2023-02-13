// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { booksSlice } from './books';
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
        books: booksSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
     
      serializableCheck: false,
    }),
    
});

