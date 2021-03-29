import React, { useState, useEffect } from 'react';
import Header from './Header';
import './header.scss';

import { connect } from 'react-redux';
import {
  tagParserOnKeyDown,
  tagParserOnKeyUp,
} from '../../redux/actions/actionsHeader';
import { firebaseAuth } from '../../redux/actions/actionsAuth';

function HeaderContainer(props) {
  const [modalSearchIsOpen, setModalSearchIsOpen] = useState(false);

  const [query, setQuery] = useState([]);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const currentUser = props.currentUser;

  function ActionMenuCloser(menuRef) {
    useEffect(() => {
      function MenuClose(event) {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target) &&
          event.target.id !== 'actions-menu-btn-img' &&
          event.target.id !== 'actions-menu-btn-user'
        ) {
          setMenuIsOpen(false);
        }
      }
      document.addEventListener('mousedown', MenuClose);
      return () => {
        document.removeEventListener('mousedown', MenuClose);
      };
    }, [menuRef]);
  }

  function btnOnKeyDown(e) {
    props.tagParserOnKeyDown(e);
    setQuery(props.searchTags);
  }

  function btnOnKeyUp(e, action) {
    props.tagParserOnKeyUp(e, action);
  }

  const vars = {
    setModalSearchIsOpen,
    modalSearchIsOpen,
    menuIsOpen,
    setMenuIsOpen,
  };

  const functions = {
    btnOnKeyDown,
    btnOnKeyUp,
    ActionMenuCloser,
  };

  return (
    <Header
      vars={vars}
      functions={functions}
      authWithGoogle={props.authWithGoogle}
      logOut={props.logOut}
      currentUser={currentUser}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    searchTags: state.headerReducer.tags,
    currentUser: state.userReducer,
  };
};

const mapDispatchToProps = {
  tagParserOnKeyDown,
  tagParserOnKeyUp,
  firebaseAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
