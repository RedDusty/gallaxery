import React from 'react';

const CardImage = ({ card }) => {
  let style = {};
  if (
    card.fileURL === '' ||
    card.fileURL === undefined ||
    card.fileURL === null ||
    card.fileURL === 'Loading...'
  ) {
    style = {
      width: '100%',
      height: '500px',
      backgroundColor: 'var(--blue030)',
      border: 'none',
    };
  }
  return (
    <div className="c-files">
      <div className="c-file-img">
        <img src={card.fileURL} alt={card.fileURL} style={style} />
      </div>
    </div>
  );
};

export default CardImage;
