import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { BookPage } from './pages/book-page';
import { MainPage } from './pages/main';
import { GenrePage } from './pages/main-genres';
import { TermsOfUse } from './pages/terms-of-use';
import { ThePublicOffer } from './pages/the-public-offer';
import { store } from './redux';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/genre/:genre' element={<GenrePage />} />
          <Route path='/terms-of-use/' element={<TermsOfUse />} />
          <Route path='/public-offer/' element={<ThePublicOffer />} />
          <Route path='/book/:book' element={<BookPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);



