import React from 'react';
import reloadSvg from '../../images/refresh.svg';

const GallaryActions = ({ refresh }) => {
  return (
    <div className="ga fcj bgHighAlt br100">
      <button
        className="btn-img-core btn-fill ga-btn bgLightAlt br100 selNot"
        onClick={refresh}
      >
        <img src={reloadSvg} alt="" data-btn="btn-icon" />
      </button>
    </div>
  );
};

export default GallaryActions;
