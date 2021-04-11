import React from 'react';
import reloadSvg from '../../images/refresh.svg';
import searchCleanSvg from '../../images/gallery/searchClear.svg';

const GalleryActions = ({ refresh, isLoading, isSearch, setIsSearch }) => {
  const style = isLoading === false ? 'not-allowed' : 'pointer';
  const titleRefresh =
    isLoading === true
      ? 'Wait loading...'
      : isSearch === true
      ? 'Cancel search'
      : 'Refresh';
  let imageRefresh = isSearch === true ? searchCleanSvg : reloadSvg;
  return (
    <div className="ga fcj bgHighAlt br25">
      <button
        className="btn-img-core btn-fill ga-btn bgLightAlt br100 selNot"
        onClick={() => {
          if (isLoading === true) {
            refresh();
            if (isSearch) {
              setIsSearch(false);
            }
          }
        }}
        style={{ cursor: style }}
        title={titleRefresh}
      >
        <img src={imageRefresh} alt="refresh" data-btn="btn-icon" />
      </button>
    </div>
  );
};

export default GalleryActions;
