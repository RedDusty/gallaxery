import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Gallery from "./Gallery";

function GetData(pageIndex) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageBlocks, setImageBlocks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setImageBlocks([]);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://localhost:3001/images?_page=" + pageIndex + "&_limit=1",
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setImageBlocks((prevImageBlocks) => {
          return [
            ...new Set([
              ...prevImageBlocks,
              ...res.data.map((b) => {
                return (
                  <div className="imageContainer" key={b.id} style={{}}>
                    <img
                      className="imageSrc"
                      src={process.env.PUBLIC_URL + b.image + ".jpg"}
                      alt={"Submit to support. Link to image: " + b.image}
                    />
                  </div>
                );
              }),
            ]),
          ];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [pageIndex]);

  return { loading, error, imageBlocks, hasMore };
}

function GalleryContainer() {
  const [pageNumber, setPageNumber] = useState(1);

  const { imageBlocks, hasMore, loading, error } = GetData(pageNumber);

  function checker(loadingElementRef) {
    if (hasMore === true) {
      return (
        <div className="loading" ref={loadingElementRef}>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="dataLoaded" ref={loadingElementRef}>
          <div className="dataLoaded-icon"></div>
          <div className="dataLoaded-text">All data loaded.</div>
        </div>
      );
    }
  }

  const observer = useRef();
  const loadingElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const vars = {
    observer,
  };

  const functions = {
    loadingElementRef,
    imageBlocks,
    checker,
  };

  return <Gallery vars={vars} functions={functions} />;
}

export default GalleryContainer;
