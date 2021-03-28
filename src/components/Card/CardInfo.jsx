import React from 'react';
import { NavLink } from 'react-router-dom';
import CardActionsContainer from './CardActionsContainer';

const CardInfo = ({ cardInfo, userInfo, cardTags }) => {
  let description = cardInfo.infoDescription;
  let title = cardInfo.infoTitle;
  description =
    description.length !== 0 ? (
      <p className="c-finfo-comment">{cardInfo.infoDescription}</p>
    ) : (
      <></>
    );
  title =
    title.length !== 0 ? (
      <div className="c-finfo-header">
        <p className="c-finfo-header-name">{cardInfo.infoTitle}</p>
      </div>
    ) : (
      <></>
    );
  const time =
    cardInfo.infoDate === 'Loading...'
      ? 'Loading'
      : new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'short',
          timeStyle: 'medium',
        })
          .format(new Date(cardInfo.infoDate))
          .replace(/\//g, '.');
  return (
    <div className="c-info">
      {title}
      {description}
      <div className="c-finfo-sub">
        <NavLink
          to={'/profile/' + userInfo.uid}
          className="c-finfo-sub-profile blinkBorder"
          tabIndex="20"
        >
          <div className="c-finfo-sub-author">
            <img
              className="c-finfo-sub-author-icon"
              src={userInfo.infoPhotoURL}
            ></img>
            <div className="c-finfo-sub-author-username">
              {userInfo.infoUsername}
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
