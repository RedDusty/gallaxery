import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import './profile.scss';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getProfileUserCards,
  getProfileUserInfo,
} from '../../redux/actions/actionsProfile';

import loadingSvg from '../../images/loading.svg';

function ProfileContainer(props) {
  useEffect(() => {
    props.getProfileUserInfo(window.location.pathname.substring(9));
    props.getProfileUserCards(
      window.location.pathname.substring(9),
      props.userLastKey
    );
  }, [window.location.pathname.substring(9)]);

  if (props.userInfoState.uid !== '') {
    document.title = props.userInfoState.displayName;
  } else {
    document.title = 'Profile';
  }

  const allCards = props.userCardsState.map((card, index) => {
    return (
      <div className="card-p" key={card.infoDate}>
        <NavLink
          to={'/card/' + card.id}
          className="card-link"
          tabIndex={100 + index}
        >
          <div className="card-p-top">
            <img src={card.fileURL} alt="" />
          </div>
          <div className="card-p-bottom">
            <img src={card.infoPhotoURL} alt="" />
            <p>{card.infoTitle}</p>
          </div>
        </NavLink>
      </div>
    );
  });

  function checker(loadingElementRef) {
    if (props.isLoadingUserCards) {
      return (
        <div className="gl-loading fja">
          <div className="glloading">
            <img
              src={loadingSvg}
              alt="Loading"
              className="cv-loading-svg br100"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="dataLoaded">
          <div className="dataLoaded-icon"></div>
          <div className="dataLoaded-text">All cards loaded.</div>
        </div>
      );
    }
  }

  const vars = { userInfo: props.userInfoState, allCards };
  const functions = {
    checker,
  };

  return <Profile vars={vars} functions={functions} />;
}

const mapStateToProps = (state) => {
  return {
    userInfoState: state.profileReducer.userInfo,
    userCardsState: state.profileReducer.userCards,
    userLastKey: state.profileReducer.lastKey,
    isLoadingUserCards: state.profileReducer.isLoadingCards,
  };
};

const mapDispatchToProps = {
  getProfileUserInfo,
  getProfileUserCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
