import React from 'react';
import reloadSvg from '../../images/refresh.svg';

const ProfileActions = ({ refresh }) => {
  return (
    <div className="pr fcj bgHighAlt br100">
      <button
        className="btn-img-core btn-fill pr-btn bgLightAlt br100 selNot"
        onClick={refresh}
      >
        <img src={reloadSvg} alt="" data-btn="btn-icon" />
      </button>
    </div>
  );
};

export default ProfileActions;
