import React from 'react';

const CardImage = ({ fileInfo }) => {
  let style = {};
  if (
    fileInfo.fileURL === '' ||
    fileInfo.fileURL === undefined ||
    fileInfo.fileURL === null ||
    fileInfo.fileURL === 'Loading...'
  ) {
    style = {
      width: '100%',
      height: '500px',
      backgroundColor: 'var(--blue030)',
      border: 'none',
    };
  }
  return (
    <div className="cvpc">
      <div className="cvpc-img">
        <img
          src={fileInfo.fileURL}
          alt={fileInfo.fileURL}
          style={style}
          data-btn="cvp-img"
        />
      </div>
    </div>
  );
};

export default CardImage;
