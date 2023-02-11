import './breadcrumbs.css';

export const Breadcrumbs = () => {
  const activeBook = JSON.parse(localStorage.getItem('activeBook'));

  return (
    <div className='book__breadcrumbs'>
      <span className='book__breadcrumbs_genre'>{activeBook.id}</span>/
      <span className='book__breadcrumbs_title'>{activeBook.title}</span>
    </div>
  );
};
