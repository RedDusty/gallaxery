import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import './header.scss';

import { connect } from 'react-redux';
import {
  tagParserOnKeyDown,
  tagParserOnKeyUp,
  searchCards,
} from '../../redux/actions/actionsHeader';
import { firebaseAuth } from '../../redux/actions/actionsAuth';
import {
  setIsSearch,
  updateGalleryCards,
} from '../../redux/actions/actionsGallery';

function HeaderContainer(props) {
  const [modalSearchIsOpen, setModalSearchIsOpen] = useState(false);
  const [searchBy, setSearchBy] = useState('byTags');
  const searchInput = useRef(null);

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
    if (searchBy === 'byTags') {
      props.tagParserOnKeyDown(e);
    }
  }

  function btnOnKeyUp(e, action) {
    if (searchBy === 'byTags') {
      props.tagParserOnKeyUp(e, action);
    }
  }

  function searchStart() {
    props.updateGalleryCards();
    props.setIsSearch(true);
    props.searchCards(props.searchTags, searchBy);
  }

  const vars = {
    setModalSearchIsOpen,
    modalSearchIsOpen,
    menuIsOpen,
    setMenuIsOpen,
    searchBy,
    setSearchBy,
    searchInput,
    searchBy,
    isLoadingCards: props.isLoadingCards,
  };

  const functions = {
    btnOnKeyDown,
    btnOnKeyUp,
    ActionMenuCloser,
    searchStart,
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
    isLoadingCards: state.galleryReducer.isLoadingCards,
  };
};

const mapDispatchToProps = {
  tagParserOnKeyDown,
  tagParserOnKeyUp,
  firebaseAuth,
  searchCards,
  updateGalleryCards,
  setIsSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
