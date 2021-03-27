import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';

const HeaderActionsMenu = (props) => {
  const ActionMenuCloser = props.ActionMenuCloser;
  const actionMenu = useRef(null);
  ActionMenuCloser(actionMenu);
  return (
    <>
      {props.menuIsOpen === true ? (
        <div className="actions-menu" ref={actionMenu}>
          {props.currentUser.uid !== '' ? (
            <>
              <NavLink
                className="btn btn-link actions-btn blinkBorder"
                to="/file-upload"
                tabIndex="5"
                onClick={() => {
                  props.setModalSearchIsOpen(false);
                }}
                onKeyPress={(e) => {
                  e.currentTarget.click();
                }}
              >
                Upload file
              </NavLink>
              <NavLink
                className="btn btn-link actions-btn blinkBorder"
                to={'/profile/' + props.currentUser.uid}
                tabIndex="6"
                onKeyPress={(e) => {
                  e.currentTarget.click();
                }}
              >
                Profile
              </NavLink>
              <button
                className="btn actions-btn blinkBorder"
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
              className="btn actions-btn blinkBorder"
              onClick={() => {
                props.authWithGoogle();
              }}
              tabIndex="5"
            >
              <div className="logo logo-google" />
              <span>Sign in with Google</span>
            </button>
          )}
          <div className="actions-menu-footer">
            <span>Made with: </span>
            <div className="actions-menu-footer-icons">
              <a
                className="icons-React icons-ico blinkBorder"
                href="https://reactjs.org/"
                tabIndex="8"
              ></a>
              <a
                className="icons-GitHub icons-ico blinkBorder"
                href="https://github.com/RedDusty/gallaxery"
                tabIndex="9"
              ></a>
              <a
                className="icons-FireBase icons-ico blinkBorder"
                href="https://firebase.google.com/"
                tabIndex="10"
              ></a>
              <a
                className="icons-Vercel icons-ico blinkBorder"
                href="https://vercel.com/"
                tabIndex="11"
              ></a>
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
