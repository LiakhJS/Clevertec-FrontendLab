import { NavLink } from 'react-router-dom';

import './breadcrumbs.css';

export const Breadcrumbs = ({ category, bookData }) => (
  <div className='book__breadcrumbs'>
    <NavLink to={`/books/${category.path}`}>
      <span className='book__breadcrumbs_genre'>{category.name}</span>
    </NavLink>
    /<span className='book__breadcrumbs_title'>{bookData.title}</span>
  </div>
);
