import React from 'react';

const CardInfo = ({ card, cardTags }) => {
  const time =
    card.infoDate === 'Loading...'
      ? 'Loading'
      : new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'short',
          timeStyle: 'medium',
        })
          .format(new Date(card.infoDate))
          .replace(/\//g, '.');
  return (
    <div className="c-info">
      <div className="c-finfo-header">
        <p className="c-finfo-name">{card.infoTitle}</p>
      </div>
      <p className="c-finfo-comment">{card.infoDescription}</p>
      <div className="c-finfo-sub">
        <div className="c-finfo-sub-author">
          <img
            className="c-finfo-sub-author-icon"
            src={card.infoPhotoURL}
          ></img>
          <div className="c-finfo-sub-author-username">{card.infoUsername}</div>
        </div>
        <p className="c-finfo-sub-time">{time}</p>
      </div>
      <div className="c-finfo-tags-container">{cardTags}</div>
    </div>
  );
};

export default CardInfo;
