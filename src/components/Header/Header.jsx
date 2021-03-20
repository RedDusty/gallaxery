import React from 'react';
import ModalSearchContainer from '../ModalWindows/ModalSearch/ModalSearchContainer';

import { NavLink, Route, Switch } from 'react-router-dom';

import actions from '../../images/header/actions.svg';
import HeaderSearch from './HeaderSearch';
import HeaderActionsMenu from './HeaderActionsMenu';

function Header(props) {
  const setModalSearchIsOpen = props.vars.setModalSearchIsOpen;
  const modalSearchIsOpen = props.vars.modalSearchIsOpen;
  const btnOnKeyDown = props.functions.btnOnKeyDown;
  const btnOnKeyUp = props.functions.btnOnKeyUp;

  return (
    <section className="h">
      <div className="icons">
        <NavLink
          className="logo logo-gallaxery"
          to="/"
          tabIndex="1"
          onKeyPress={(e) => {
            e.currentTarget.click();
          }}
        ></NavLink>
      </div>
      <HeaderSearch
        modalSearchIsOpen={modalSearchIsOpen}
        setModalSearchIsOpen={setModalSearchIsOpen}
        btnOnKeyUp={btnOnKeyUp}
        btnOnKeyDown={btnOnKeyDown}
      />
      <div className="actions">
        <button
          className="actions-menu-btn btn"
          onClick={() => {
            setModalSearchIsOpen(false);
            props.vars.menuIsOpen === true
              ? props.vars.setMenuIsOpen(false)
              : props.vars.setMenuIsOpen(true);
          }}
          tabIndex="5"
          id="actions-menu-btn"
        >
          {props.currentUser.currentUser !== null &&
          props.currentUser.currentUser !== undefined ? (
            <img
              src={props.currentUser.currentUser.photoURL}
              className="actions-menu-btn-user"
              alt={props.currentUser.currentUser.displayName}
            />
          ) : (
            <></>
          )}
          <img src={actions} data-alt="💙" id="actions-menu-btn-img" />
        </button>
      </div>
      <HeaderActionsMenu
        menuIsOpen={props.vars.menuIsOpen}
        setModalSearchIsOpen={setModalSearchIsOpen}
        currentUser={props.currentUser}
        logOut={props.logOut}
        authWithGoogle={props.authWithGoogle}
        ActionMenuCloser={props.functions.ActionMenuCloser}
      />
      <ModalSearchContainer
        isOpen={modalSearchIsOpen}
        setIsOpen={setModalSearchIsOpen}
        searchParams={props.searchParams}
      />
    </section>
  );
}

export default Header;
