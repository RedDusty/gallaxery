import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';

import reactIcon from '../../images/header/React.png';
import githubIcon from '../../images/header/GitHubNight.png';
import firebaseIcon from '../../images/header/FireBase.png';
import vercelIcon from '../../images/header/Vercel.png';

const HeaderActionsMenu = (props) => {
  const ActionMenuCloser = props.ActionMenuCloser;
  const actionMenu = useRef(null);
  ActionMenuCloser(actionMenu);
  return (
    <>
      {props.menuIsOpen === true ? (
        <div className="actions-menu bgLight fcj shadowLight" ref={actionMenu}>
          {props.currentUser.uid !== '' ? (
            <>
              <NavLink
                className="btn-core btn-fill fW600 mtopX3"
                to="/card-upload"
                tabIndex="5"
                onClick={() => {
                  props.setModalSearchIsOpen(false);
                }}
                onKeyPress={(e) => {
                  e.currentTarget.click();
                }}
              >
                Upload card
              </NavLink>
              <NavLink
                className="btn-core btn-fill fW600 mtopX3"
                to={'/profile/' + props.currentUser.uid}
                tabIndex="6"
                onKeyPress={(e) => {
                  e.currentTarget.click();
                }}
              >
                Profile
              </NavLink>
              <button
                className="btn-core btn-fill fS16 fW600 mtopX3"
                onClick={() => {
                  props.logOut();
                  window.location.reload();
                }}
                tabIndex="7"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              className="btn-core btn-fill fS16 fW600 mtopX3"
              onClick={() => {
                props.authWithGoogle();
              }}
              tabIndex="5"
            >
              <div className="logo logo-google" />
              <span>Sign in with Google</span>
            </button>
          )}
          <div className="actions-menu-footer brdGray mtopX3 mbottom fa">
            <span className="mtop">Made with: </span>
            <div className="fjs mtop">
              <a
                className="logo-header logo-header-react br100"
                href="https://reactjs.org/"
                tabIndex="8"
              >
                <img src={reactIcon} data-alt="R" className="br100" />
              </a>
              <a
                className="logo-header logo-header-github br100"
                href="https://github.com/RedDusty/gallaxery"
                tabIndex="9"
              >
                <img src={githubIcon} data-alt="G" className="br100" />
              </a>
              <a
                className="logo-header logo-header-firebase br100"
                href="https://firebase.google.com/"
                tabIndex="10"
              >
                <img src={firebaseIcon} data-alt="F" className="br100" />
              </a>
              <a
                className="logo-header logo-header-vercel br100"
                href="https://vercel.com/"
                tabIndex="11"
              >
                <img src={vercelIcon} data-alt="V" className="br100" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default HeaderActionsMenu;
