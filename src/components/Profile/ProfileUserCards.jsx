import React from 'react';

import Masonry from 'react-masonry-component';

const ProfileUserCards = ({ loadingElementRef, cards, checker }) => {
  const masonryOptions = {
    transitionDuration: '0.25s',
    fitWidth: true,
  };
  return (
    <div className="p-cards">
      <Masonry
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        className="cards-container"
      >
        {cards}
      </Masonry>
      {checker(loadingElementRef)}
    </div>
  );
};

export default ProfileUserCards;
