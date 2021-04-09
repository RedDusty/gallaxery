import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import './profile.scss';

import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getProfileUserCards,
  getProfileUserInfo,
  newProfileLoad,
} from '../../redux/actions/actionsProfile';

import loadingSvg from '../../images/loading.svg';
import NotFound from '../NotFound';

function ProfileContainer(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState(window.screen.width);
  const [scrollPercent, setScrollPercent] = useState(false);

  function refresh() {
    props.newProfileLoad();
    props.getProfileUserInfo(window.location.pathname.substring(9));
    props.getProfileUserCards(window.location.pathname.substring(9), 0, []);
  }

  useEffect(() => {
    props.newProfileLoad();
    props.getProfileUserInfo(window.location.pathname.substring(9));
    props.getProfileUserCards(window.location.pathname.substring(9), 0, []);
  }, [props.keyUID]);

  useEffect(() => {
    if (!props.endLoadData) {
      let checkHeightInterval = setInterval(() => {
        const winScroll = document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        setScrollPercent(scrolled.toFixed(0));

        if (scrollPercent >= 60 || scrollPercent === 'NaN') {
          if (!isLoading) {
            props.getProfileUserInfo(window.location.pathname.substring(9));
            props.getProfileUserCards(
              window.location.pathname.substring(9),
              props.lastId,
              props.userCardsState,
              props.userCardId
            );
          }
          setIsLoading(props.isLoadingCards);
        }
      }, 1000);

      return () => {
        clearInterval(checkHeightInterval);
      };
    }
  });

  useEffect(() => {
    if (window.screen.width <= 650) {
      setIsMobile(true);
      setDeviceWidth(window.screen.width);
    } else {
      setIsMobile(false);
    }
    function isMobileChecker() {
      if (window.screen.width <= 650) {
        setIsMobile(true);
        setDeviceWidth(window.screen.width);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener('resize', isMobileChecker);
  }, []);

  if (props.userInfoState.uid === undefined) {
    return <NotFound />;
  }

  if (props.userInfoState.uid !== '') {
    document.title = props.userInfoState.displayName;
  } else {
    document.title = 'Profile';
  }

  function checker() {
    if (!props.endLoadData) {
      return (
        <div className="s-loading fja">
          <img src={loadingSvg} alt="Loading" className="s-loading-svg br100" />
        </div>
      );
    } else {
      return (
        <div className="dataLoaded">
          <div className="dataLoaded-icon"></div>
          <div className="dataLoaded-text">Loaded.</div>
        </div>
      );
    }
  }

  const allCards = props.userCardsState.map((card, index) => {
    const href =
      window.location.pathname.slice(0, 5) === '/card'
        ? card.id
        : '/card/' + card.id;
    let cardHeight = 0;
    let cardWidth = 250;
    if (isMobile) {
      cardWidth = deviceWidth / 2 - 10;
      let cardWidthPerc = (cardWidth * 100) / card.width;
      cardHeight = (card.height * cardWidthPerc) / 100 + 'px';
    } else {
      let cardWidthPerc = (cardWidth * 100) / card.width;
      cardHeight = (card.height * cardWidthPerc) / 100 + 'px';
    }
    return (
      <div
        className="card-p card-gutter"
        key={card.infoDate}
        style={{ width: cardWidth + 'px' }}
      >
        <NavLink to={'' + href} className="card-link" tabIndex={100 + index}>
          <div className="card-p-top">
            <img
              src={card.fileURL}
              alt={card.fileURL}
              style={{
                height: cardHeight,
                width: cardWidth + 'px',
              }}
            />
          </div>
          <div className="card-p-bottom">
            <img src={card.infoPhotoURL} alt="" />
            <p>{card.infoTitle}</p>
          </div>
        </NavLink>
      </div>
    );
  });

  const vars = {
    userInfo: props.userInfoState,
    allCards,
    isLoading: props.isLoadingCards,
  };
  const functions = {
    checker,
    refresh,
  };

  return <Profile vars={vars} functions={functions} />;
}

const mapStateToProps = (state) => {
  return {
    userInfoState: state.profileReducer.userInfo,
    userCardsState: state.profileReducer.userCards,
    lastId: state.profileReducer.lastId,
    isLoadingCards: state.profileReducer.isLoadingCards,
    endLoadData: state.profileReducer.endLoadData,
    userCardId: state.profileReducer.cardId,
  };
};

const mapDispatchToProps = {
  getProfileUserInfo,
  getProfileUserCards,
  newProfileLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
