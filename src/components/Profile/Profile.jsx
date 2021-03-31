import React from 'react';
import Gallery from '../Gallery/Gallery';
import ProfileUserInfo from './ProfileUserInfo';

const Profile = (props) => {
  return (
    <div className="p fcj">
      <ProfileUserInfo
        userInfo={props.vars.userInfo}
        cardsCount={props.vars.allCards.length}
      />
      <Gallery
        allCards={props.vars.allCards}
        checker={props.functions.checker}
        loadingElementRef={props.functions.loadingElementRef}
      ></Gallery>
    </div>
  );
};

export default Profile;
