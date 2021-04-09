import React from 'react';
import Gallery from '../Gallery/Gallery';
import ProfileUserInfo from './ProfileUserInfo';
import ProfileActions from './ProfileActions';

const Profile = (props) => {
  return (
    <div className="p fcj">
      <ProfileUserInfo userInfo={props.vars.userInfo} />
      <Gallery
        allCards={props.vars.allCards}
        checker={props.functions.checker}
      ></Gallery>
      <ProfileActions
        refresh={props.functions.refresh}
        isLoading={props.vars.isLoading}
      />
    </div>
  );
};

export default Profile;
