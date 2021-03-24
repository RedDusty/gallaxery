import React from 'react';
import { NavLink } from 'react-router-dom';
import CardActionsContainer from './CardActionsContainer';

const CardInfo = ({ card, cardTags }) => {
  let description = card.infoDescription;
  let title = card.infoTitle;
  description =
    description.length !== 0 ? (
      <p className="c-finfo-comment">{card.infoDescription}</p>
    ) : (
      <></>
    );
  title =
    title.length !== 0 ? (
      <div className="c-finfo-header">
        <p className="c-finfo-header-name">{card.infoTitle}</p>
      </div>
    ) : (
      <></>
    );
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
      {title}
      {description}
      <div className="c-finfo-sub">
        <NavLink
          to={'/profile/' + card.uid}
          className="c-finfo-sub-profile blinkBorder"
          tabIndex="20"
        >
          <div className="c-finfo-sub-author">
            <img
              className="c-finfo-sub-author-icon"
              src={card.infoPhotoURL}
            ></img>
            <div className="c-finfo-sub-author-username">
              {card.infoUsername}
            </div>
          </div>
        </NavLink>
        <p className="c-finfo-sub-time">{time}</p>
      </div>
      <div className="c-finfo-tags-container">{cardTags}</div>
      {/* <CardActionsContainer card={card} /> */}
    </div>
  );
};

export default CardInfo;
