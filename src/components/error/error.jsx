import { useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as  ErrorIcon} from '../../images/attention-icon.svg';
import { ReactComponent as  CloseIcon} from '../../images/error-cross-icon.svg';

import './error.css';

export const Error = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={classNames('error', { hidden: !isOpen })} data-test-id='error'>
      <div className='content-error'>
      <ErrorIcon/> Что-то пошло не так. Обновите страницу через некоторое время.
      </div>
      <button className='closeBtn' type='button' onClick={() => setIsOpen(false)}>
      <CloseIcon width='100%' height='100%'/>
      </button>
    </div>
  );
};
