import React, { useState } from 'react';
import Header from './Header';
import './header.scss';

import { connect } from 'react-redux';
import { tagParserOnKeyDown, tagParserOnKeyUp } from '../../redux/actions';

function HeaderContainer(props) {
  const [modalSearchIsOpen, setModalSearchIsOpen] = useState(false);
  const [searchGoogle, setSearchGoogle] = useState(false);
  const [searchPinterest, setSearchPinterest] = useState(false);
  const [searchImgur, setSearchImgur] = useState(false);
  const [confirmedImages, setConfirmedImages] = useState(true);
  const [userImages, setUserImages] = useState(false);
  const [anonymousImages, setAnonymousImages] = useState(false);
  const [query, setQuery] = useState([]);

  function queryUpdater(e = '') {
    setQuery(props.searchTags);
    props.tagParserOnKeyDown(e);
  }

  function btnOnKeyDown(e) {
    props.tagParserOnKeyDown(e);
    queryUpdater();
  }

  function btnOnKeyUp(e, action) {
    props.tagParserOnKeyUp(e, action);
    queryUpdater();
  }

  const searches = {
    searchGoogle,
    setSearchGoogle,
    searchPinterest,
    setSearchPinterest,
    searchImgur,
    setSearchImgur,
  };

  const userAllowed = {
    confirmedImages,
    setConfirmedImages,
    userImages,
    setUserImages,
    anonymousImages,
    setAnonymousImages,
  };

  const vars = {
    setModalSearchIsOpen,
    modalSearchIsOpen,
    query,
    searches,
    userAllowed,
  };

  const functions = {
    btnOnKeyDown,
    btnOnKeyUp,
  };

  return <Header vars={vars} functions={functions} />;
}

const mapStateToProps = (state) => {
  return {
    searchTags: state.searchReducer.tags,
  };
};

const mapDispatchToProps = {
  tagParserOnKeyDown,
  tagParserOnKeyUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
