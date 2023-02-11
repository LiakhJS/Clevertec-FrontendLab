import { configureStore } from '@reduxjs/toolkit';

import { burgerSlice } from './reducer';

export const store = configureStore({
    reducer: {
        burger: burgerSlice.reducer,
    },
})
