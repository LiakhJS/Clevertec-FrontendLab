import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { HashRouter, Navigate,Route, Routes} from 'react-router-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Authorization } from './pages/authorization/authorization';
import { BookPage } from './pages/book-page';
import { ForgotPassword } from './pages/forgot-password';
import { MainPage } from './pages/main';
import { Registration } from './pages/registration';
// import { ResetPassword } from './pages/reset-password';
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
          {/* <Route path='/' element={<Navigate to='/books/all' />} /> */}
          <Route path='/' element={<Authorization />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/auth' element={<Authorization />} />

          <Route path='/books/:category' element={<MainPage />} />
          <Route path='/terms-of-use/' element={<TermsOfUse />} />
          <Route path='/public-offer/' element={<ThePublicOffer />} />
          <Route path='/book/:category/:bookId' element={<BookPage />} />
          <Route path='/forgot-pass' element={<ForgotPassword />} />

        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);



