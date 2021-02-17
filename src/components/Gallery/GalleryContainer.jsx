import React, { useCallback, useEffect, useRef, useState } from "react";
import Gallery from "./Gallery";

function GalleryContainer() {
  const [imageBlock, setImageBlock] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3001/images?_page=" + pageIndex + "&_limit=2")
      .then((Response) => Response.json())
      .then((json) => {
        setImageBlock((prevBlocks) => {
          [...new Set([...prevBlocks, ...json])];
        });
      });
  }, []);

  const observer = useRef(null);

  const loadingElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setPageIndex((prevPageIndex) => prevPageIndex + 1);
          console.log("Loading more content...");
        }, 2500);
      }
    });
    if (node) observer.current.observe(node);
  });

  console.log(imageBlock);

  const imagesBlocks = imageBlock.map((block, index) => {
    return (
      <div className="imageContainer" key={index} style={{}}>
        <img
          className="imageSrc"
          src={process.env.PUBLIC_URL + block.image + ".jpg"}
          alt={"Submit to support. Link to image: " + block.image}
        />
      </div>
    );
  });

  const vars = {
    observer,
  };

  const functions = {
    loadingElementRef,
    imagesBlocks,
  };

  return <Gallery vars={vars} functions={functions} />;
}

export default GalleryContainer;
