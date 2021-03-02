import React, { useContext } from 'react';
import ModalSearchContainer from '../ModalWindows/ModalSearch/ModalSearchContainer';
import Context from '../../context';

import { NavLink, Route, Switch } from 'react-router-dom';
import { logOut, signInWithGoogle } from '../../firebase';

function Header(props) {
  const setModalSearchIsOpen = props.vars.setModalSearchIsOpen;
  const modalSearchIsOpen = props.vars.modalSearchIsOpen;
  const btnOnKeyDown = props.functions.btnOnKeyDown;
  const btnOnKeyUp = props.functions.btnOnKeyUp;

  const { user } = useContext(Context);

  return (
    <section className="Header">
      <div className="icons">
        <a
          className="icons-React icons-ico"
          href="https://reactjs.org/"
          tabIndex="1"
        ></a>
        <a className="icons-GitHub icons-ico" tabIndex="2"></a>
        <a
          className="icons-FireBase icons-ico"
          href="https://firebase.google.com/"
          tabIndex="3"
        ></a>
        <a className="icons-Vercel icons-ico" tabIndex="4"></a>
      </div>
      <div className="search">
        <div className="search-div">
          <button
            className="search-icon search-icon-extended btn btn-icon"
            tabIndex="5"
            onClick={() => {
              setModalSearchIsOpen(!modalSearchIsOpen);
            }}
          ></button>
          <input
            type="text"
            className="search-input search-btn"
            placeholder="Search..."
            onKeyDown={btnOnKeyDown}
            onKeyUp={btnOnKeyUp}
            onClick={() => {
              setModalSearchIsOpen(true);
            }}
            tabIndex="6"
          ></input>
          <button
            className="search-icon search-icon-magnifier btn btn-icon"
            tabIndex="7"
          ></button>
        </div>
      </div>
      <div className="actions">
        <Switch>
          <Route exact path="/">
            <NavLink
              className="btn btn-link"
              to="/"
              tabIndex="8"
              onKeyPress={(e) => {
                e.currentTarget.click();
              }}
            >
              Reload
            </NavLink>
          </Route>
          <Route>
            <NavLink
              className="btn btn-link"
              to="/"
              tabIndex="8"
              onKeyPress={(e) => {
                e.currentTarget.click();
              }}
            >
              Main page
            </NavLink>
          </Route>
        </Switch>
        <button className="actions-btnUpload actions-btn btn" tabIndex="9">
          Upload image
        </button>
        {user ? (
          <>
            <NavLink
              className="actions-btnAuth actions-btn btn btn-link"
              to="/profile"
              tabIndex="10"
              onKeyPress={(e) => {
                e.currentTarget.click();
              }}
            >
              Profile
            </NavLink>
            <button
              className="actions-btnAuth actions-btn btn"
              onClick={() => {
                logOut();
                window.location.reload();
              }}
              tabIndex="11"
            >
              Log out
            </button>
          </>
        ) : (
          <button
            className="actions-btnAuth actions-btn btn"
            onClick={() => {
              signInWithGoogle();
            }}
            tabIndex="10"
          >
            Sign in
          </button>
        )}
      </div>
      <ModalSearchContainer
        isOpen={modalSearchIsOpen}
        setIsOpen={setModalSearchIsOpen}
      />
    </section>
  );
}

export default Header;
