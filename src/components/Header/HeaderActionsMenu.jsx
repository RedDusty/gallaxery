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
          {props.currentUser.currentUser !== null &&
          props.currentUser.currentUser !== undefined ? (
            <>
              <NavLink
                className="btn btn-link actions-btn"
                to="/file-upload"
                tabIndex="5"
                onClick={() => {
                  props.setModalSearchIsOpen(false);
                }}
              >
                Upload file
              </NavLink>
              <NavLink
                className="btn btn-link actions-btn"
                to="/profile"
                tabIndex="6"
                onKeyPress={(e) => {
                  e.currentTarget.click();
                }}
              >
                Profile
              </NavLink>
              <button
                className="btn actions-btn"
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
              className="btn actions-btn"
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
                className="icons-React icons-ico"
                href="https://reactjs.org/"
                tabIndex="8"
              ></a>
              <a className="icons-GitHub icons-ico" tabIndex="9"></a>
              <a
                className="icons-FireBase icons-ico"
                href="https://firebase.google.com/"
                tabIndex="10"
              ></a>
              <a className="icons-Vercel icons-ico" tabIndex="11"></a>
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
