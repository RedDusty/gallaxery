import React, { useState, useContext } from 'react';
import Header from './Header';
import './header.scss';

import { connect } from 'react-redux';
import { tagParserOnKeyDown, tagParserOnKeyUp } from '../../redux/actions';
import { UserContext } from '../../UserProvider';

function HeaderContainer(props) {
  const [modalSearchIsOpen, setModalSearchIsOpen] = useState(false);
  const [searchGoogle, setSearchGoogle] = useState(false);
  const [searchPinterest, setSearchPinterest] = useState(false);
  const [searchImgur, setSearchImgur] = useState(false);
  const [unsplash, setUnsplash] = useState(false); // ok
  const [confirmedImages, setConfirmedImages] = useState(true);
  const [userImages, setUserImages] = useState(false);

  const [reloadBtnText, setReloadBtnText] = useState('Reload');
  const [query, setQuery] = useState([]);

  const currentUser = useContext(UserContext);

  function btnOnKeyDown(e) {
    props.tagParserOnKeyDown(e);
    setQuery(props.searchTags);
  }

  function btnOnKeyUp(e, action) {
    props.tagParserOnKeyUp(e, action);
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
  };

  const searchParams = {
    searches,
    userAllowed,
  };

  const vars = {
    setModalSearchIsOpen,
    modalSearchIsOpen,
    reloadBtnText,
  };

  const functions = {
    btnOnKeyDown,
    btnOnKeyUp,
  };

  return (
    <Header
      vars={vars}
      functions={functions}
      authWithGoogle={props.authWithGoogle}
      logOut={props.logOut}
      currentUser={currentUser}
      searchParams={searchParams}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    searchTags: state.headerReducer.tags,
  };
};

const mapDispatchToProps = {
  tagParserOnKeyDown,
  tagParserOnKeyUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
