import react from "react";
import "./gallery.scss";

function Gallery(props) {
  const imagesBlocks = props.functions.imagesBlocks;
  const loadingElementRef = props.functions.loadingElementRef;

  return (
    <section className="Gallery">
      {imagesBlocks}
      <div className="loading" ref={loadingElementRef}>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
