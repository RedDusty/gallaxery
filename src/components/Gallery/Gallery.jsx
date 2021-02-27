import React from 'react';
import './gallery.scss';

function Gallery(props) {
  const allImageBlocks = props.vars.allImageBlocks;
  const loadingElementRef = props.functions.loadingElementRef;
  const checker = props.functions.checker;

  return (
    <section className="Gallery">
      {allImageBlocks}
      {checker(loadingElementRef)}
    </section>
  );
}

export default Gallery;
