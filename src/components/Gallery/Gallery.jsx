import React from 'react';
import './gallery.scss';

import Masonry from 'react-masonry-component';

function Gallery({ allCards, checker }) {
  const masonryOptions = {
    transitionDuration: '0.25s',
    fitWidth: true,
  };

  return (
    <section className="g">
      <Masonry
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        className="cards-container"
      >
        {allCards}
      </Masonry>
      {checker()}
    </section>
  );
}

export default Gallery;
