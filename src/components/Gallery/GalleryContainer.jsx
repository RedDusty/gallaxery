import React, { useEffect, useState } from 'react';
import Gallery from './Gallery';

import { getGalleryCards } from '../../redux/actions/actionsGallery';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

import loadingSvg from '../../images/loading.svg';

const GalleryContainer = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState(window.screen.width);
  document.title = 'Gallaxery';
  useEffect(() => {
    props.getGalleryCards(props.cards, props.lastKey);
  }, []);

  function checker(loadingElementRef) {
    if (props.isLoadingCards) {
      return (
        <div className="gl-loading fja">
          <img
            src={loadingSvg}
            alt="Loading"
            className="gl-loading-svg br100"
          />
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

  const allCards = props.cards.map((card, index) => {
    const href =
      window.location.pathname.slice(0, 5) === '/card'
        ? card.id
        : 'card/' + card.id;
    let cardHeight = 0;
    let cardWidth = 250;
    if (isMobile) {
      cardWidth = deviceWidth / 2 - 8;
      cardHeight = (card.height * ((cardWidth * 100) / 250)) / 100;
    } else {
      cardHeight = card.height + 'px';
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
              alt=""
              style={{ height: cardHeight, width: cardWidth + 'px' }}
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

  return <Gallery allCards={allCards} checker={checker} />;
};

const mapStateToProps = (state) => {
  return {
    cards: state.galleryReducer.cards,
    lastKey: state.galleryReducer.lastKey,
    isLoadingCards: state.galleryReducer.isLoadingCards,
  };
};

const mapDispatchToProps = {
  getGalleryCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
