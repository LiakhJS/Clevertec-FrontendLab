
import { useSelector } from 'react-redux';

export const BookTitle = ({ text, highlight, isFormOfList }) => {


    const isSearchOpened = useSelector((state) => state.books.isSearchOpened);
    
    
  const getHighlightedText = (textx, higlight) => {
    const parts = textx.split(new RegExp(`(${highlight})`, 'gi'));

    return parts.map((part) =>
      part.toLowerCase() === higlight.toLowerCase() ? (
        <span key={Math.random()} style={{ color: '#e8bb49' }}>{part}</span>
      ) : ( part
      ))
    
  };

  return (
    <div className={isFormOfList ? 'card_name inColumn mobile' : 'card_name mobile'}>
      {isSearchOpened && highlight.trim().length>0? getHighlightedText(text, highlight) : text}
    </div>
  );
};
