import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <div className="nf">
      <div className="nf-top">
        <div className="nf-left">
          <div className="nf-left-image"></div>
        </div>
        <div className="nf-right">
          <div className="nf-right-code">404</div>
          <div className="nf-right-title">Oops. Something is wrong!</div>
        </div>
      </div>
      <div className="nf-bottom">
        <div className="nf-bottom-message">
          It looks like you've visited a page that doesn't exist.
        </div>
        <div className="nf-bottom-button">
          <NavLink to="/" className="btn-core btn-fill">
            Back to main page
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
