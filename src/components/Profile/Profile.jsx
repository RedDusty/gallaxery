import React from 'react';
import ProfileUserCards from './ProfileUserCards';
import ProfileUserInfo from './ProfileUserInfo';

const Profile = (props) => {
  return (
    <div className="p fcj">
      <ProfileUserInfo
        userInfo={props.vars.userInfo}
        cardsCount={props.vars.allCards.length}
      />
      <ProfileUserCards
        loadingElementRef={props.functions.loadingElementRef}
        cards={props.vars.allCards}
        checker={props.functions.checker}
      />
    </div>
  );
};

export default Profile;
