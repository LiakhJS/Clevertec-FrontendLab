import { Content } from '../content';
import { NavMenu } from '../nav-menu';

import './main-container.css';

export const MainContainer = ({ categories,isActiveGenre, setIsActiveGenre, isActiveShowCase, setIsActiveShowcase,books }) => (
  <div className='main-container'>
    <NavMenu
  books={books}  
      isActiveGenre={isActiveGenre}
      setIsActiveGenre={setIsActiveGenre}
      isActiveShowCase={isActiveShowCase}
      setIsActiveShowcase={setIsActiveShowcase}
    />
    {/* <Content books={books} categories={categories}/> */}
    <Content categories={categories}/>
  </div>
);
