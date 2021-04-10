import React from 'react';
import ModalSearchContainer from '../ModalWindows/ModalSearch/ModalSearchContainer';

import { NavLink } from 'react-router-dom';

import actions from '../../images/header/actions.svg';
import HeaderSearch from './HeaderSearch';
import HeaderActionsMenu from './HeaderActionsMenu';

function Header(props) {
  const setModalSearchIsOpen = props.vars.setModalSearchIsOpen;
  const modalSearchIsOpen = props.vars.modalSearchIsOpen;
  const btnOnKeyDown = props.functions.btnOnKeyDown;
  const btnOnKeyUp = props.functions.btnOnKeyUp;

  return (
    <section className="fja h bgLight">
      <div className="h-icon fja">
        <NavLink
          className="logo logo-gal logo-fill br100 selNot"
          to="/"
          tabIndex="1"
          onKeyPress={(e) => {
            e.currentTarget.click();
          }}
          title="Main page"
        ></NavLink>
      </div>
      <HeaderSearch
        modalSearchIsOpen={modalSearchIsOpen}
        setModalSearchIsOpen={setModalSearchIsOpen}
        btnOnKeyUp={btnOnKeyUp}
        btnOnKeyDown={btnOnKeyDown}
      />
      <div className="actions fa">
        <button
          className="btn-core btn-fill fjs"
          onClick={() => {
            setModalSearchIsOpen(false);
            props.vars.menuIsOpen === true
              ? props.vars.setMenuIsOpen(false)
              : props.vars.setMenuIsOpen(true);
          }}
          tabIndex="5"
          id="actions-menu-btn"
          title="Menu"
        >
          {props.currentUser.uid === '' ? (
            <></>
          ) : (
            <img
              src={props.currentUser.photoURL}
              className="userIcon32 br100"
              data-alt="💜"
              id="actions-menu-btn-user"
              style={{ marginRight: '4px' }}
            />
          )}
          <img
            src={actions}
            data-alt="💙"
            id="actions-menu-btn-img"
            data-btn="btn-icon"
          />
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
      />
    </section>
  );
}

export default Header;
