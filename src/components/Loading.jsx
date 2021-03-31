import React from 'react';
import loadingSvg from '../images/loading.svg';

const Loading = () => {
  return (
    <div className="gl-loading fja">
      <img src={loadingSvg} alt="Loading" className="gl-loading-svg br100" />
    </div>
  );
};

export default Loading;
