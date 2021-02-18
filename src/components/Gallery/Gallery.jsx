import react from "react";
import "./gallery.scss";

function Gallery(props) {
  const imagesBlocks = props.functions.imageBlocks;
  const loadingElementRef = props.functions.loadingElementRef;
  const checker = props.functions.checker;

  return (
    <section className="Gallery">
      {imagesBlocks}
      {checker(loadingElementRef)}
    </section>
  );
}

export default Gallery;
