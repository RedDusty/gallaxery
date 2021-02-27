import React from 'react';
import ModalSearchContainer from '../ModalWindows/ModalSearch/ModalSearchContainer';

function Header(props) {
  const setModalSearchIsOpen = props.vars.setModalSearchIsOpen;
  const modalSearchIsOpen = props.vars.modalSearchIsOpen;
  const searches = props.vars.searches;
  const userAllowed = props.vars.userAllowed;
  const btnOnKeyDown = props.functions.btnOnKeyDown;
  const btnOnKeyUp = props.functions.btnOnKeyUp;

  return (
    <section className="Header">
      <div className="icons">
        <a className="icons-React icons-ico" href="https://reactjs.org/"></a>
        <a className="icons-GitHub icons-ico"></a>
        <a
          className="icons-FireBase icons-ico"
          href="https://firebase.google.com/"
        ></a>
        <a className="icons-Vercel icons-ico"></a>
      </div>
      <div className="search">
        <div className="search-div">
          <input
            type="text"
            className="search-input search-btn"
            placeholder="Search..."
            onKeyDown={btnOnKeyDown}
            onKeyUp={btnOnKeyUp}
            onClick={() => {
              setModalSearchIsOpen(!modalSearchIsOpen);
            }}
          ></input>
          <div className="search-icon"></div>
        </div>
      </div>
      <div className="actions">
        <button className="actions-btnUpload actions-btn btn">
          Upload image
        </button>
        <button className="actions-btnAuth actions-btn btn">Sign in</button>
      </div>
      <ModalSearchContainer
        isOpen={modalSearchIsOpen}
        setIsOpen={setModalSearchIsOpen}
        searches={searches}
        userAllowed={userAllowed}
      />
    </section>
  );
}

export default Header;
