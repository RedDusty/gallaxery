import React from 'react';
import reloadSvg from '../../images/refresh.svg';

const ProfileActions = ({ refresh, isLoading }) => {
  const style = isLoading === true ? 'not-allowed' : 'pointer';
  return (
    <div className="pr fcj bgHighAlt br100">
      <button
        className="btn-img-core btn-fill pr-btn bgLightAlt br100 selNot"
        onClick={() => {
          if (isLoading === false) refresh();
        }}
        style={{ cursor: style }}
      >
        <img src={reloadSvg} alt="refresh" data-btn="btn-icon" />
      </button>
    </div>
  );
};

export default ProfileActions;
