import React from 'react';
import './gallery.scss';

import Masonry from 'react-masonry-component';

function Gallery(props) {
  const allCards = props.vars.allCards;
  const loadingElementRef = props.functions.loadingElementRef;
  const checker = props.functions.checker;

  const masonryOptions = {
    transitionDuration: '0.25s',
  };

  return (
    <section className="g">
      <Masonry
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
      >
        {allCards}
      </Masonry>
      {checker(loadingElementRef)}
    </section>
  );
}

export default Gallery;
