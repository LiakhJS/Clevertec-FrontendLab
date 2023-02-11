import { Content } from '../content';
import { NavMenu } from '../nav-menu';

import './main-container.css';

export const MainContainer = ({ isActiveGenre, setIsActiveGenre, isActiveShowCase, setIsActiveShowcase }) => (
  <div className='main-container'>
    <NavMenu
      isActiveGenre={isActiveGenre}
      setIsActiveGenre={setIsActiveGenre}
      isActiveShowCase={isActiveShowCase}
      setIsActiveShowcase={setIsActiveShowcase}
    />
    <Content />
  </div>
);
