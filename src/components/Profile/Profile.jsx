import React from 'react';
import Masonry from 'react-masonry-component';

const Profile = (props) => {
  const userInfo = props.vars.userInfo;
  const loadingElementRef = props.functions.loadingElementRef;

  const displayName = userInfo.displayName;
  const photoURLAlt = userInfo.photoURLAlt;
  const photoURL = userInfo.photoURL;

  const masonryOptions = {
    transitionDuration: '0.25s',
    fitWidth: true,
  };

  return (
    <div className="p">
      <div className="p-info">
        <div className="p-info-photo">
          <img src={photoURL} alt={photoURLAlt} />
        </div>
        <div className="p-info-username">
          <p>{displayName}</p>
        </div>
        <div className="p-info-cards">
          <p>Cards: {props.vars.allCards.length}</p>
          <p>Albums: 0</p>
        </div>
      </div>
      <div className="p-images-container">
        <Masonry
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
          className="cards-container"
        >
          {props.vars.allCards}
        </Masonry>
        {props.functions.checker(loadingElementRef)}
      </div>
    </div>
  );
};

export default Profile;
