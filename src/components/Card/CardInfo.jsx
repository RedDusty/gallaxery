import React from 'react';
import { NavLink } from 'react-router-dom';
// import CardActionsContainer from './CardActionsContainer';

const CardInfo = ({ cardInfo, userInfo, cardTags }) => {
  let description = cardInfo.infoDescription;
  let title = cardInfo.infoTitle;
  description =
    description.length !== 0 ? (
      <p className="cvpci-comment cvpci-text br25 fS18 fW500 bgLight">
        {cardInfo.infoDescription}
      </p>
    ) : (
      <></>
    );
  title =
    title.length !== 0 ? (
      <div className="cvpci-header">
        <p className="cvpci-name cvpci-text br25 fS18 fW600 shadowDark">
          {cardInfo.infoTitle}
        </p>
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
  let userProfile = (
    <NavLink
      to={'/profile/' + userInfo.uid}
      className="cvpci-sub-l btn-core btn-fill fja br25 mtop"
      tabIndex="20"
    >
      <img className="br100" src={userInfo.infoPhotoURL}></img>
      <p className="cvpci-sub-lu fW500">{userInfo.infoUsername}</p>
    </NavLink>
  );
  if (userInfo.uid === undefined || userInfo.uid === '') {
    userProfile = <></>;
  }
  return (
    <div className="cvpci">
      {title}
      {description}
      <div className="cvpci-sub fcj mtop">
        {userProfile}
        <p className="cvpci-sub-time mtop fW500">{time}</p>
      </div>
      <div className="cvpci-tags-container bgHighAlt br25">{cardTags}</div>
      {/* <CardActionsContainer cardInfo={cardInfo} /> */}
    </div>
  );
};

export default CardInfo;
