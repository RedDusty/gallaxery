import React, { useEffect, useState } from 'react';
import Gallery from './Gallery';

import {
  getGalleryCards,
  updateGalleryCards,
  getSearchedCards,
  setIsSearch,
  setLoading,
} from '../../redux/actions/actionsGallery';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import loadingSvg from '../../images/loading.svg';
import GalleryActions from './GalleryActions';

const GalleryContainer = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState(window.screen.width);
  const [scrollPercent, setScrollPercent] = useState(false);

  window.document.title = 'Gallaxery';

  function refresh() {
    props.updateGalleryCards();
    props.getGalleryCards([], '');
  }

  useEffect(() => {
    props.setLoading(true);
  }, [props.searchedCards, props.isSearch]);

  useEffect(() => {
    if (!props.endLoadData) {
      let checkHeightInterval = setInterval(() => {
        const winScroll = document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        setScrollPercent(scrolled.toFixed(0));
        if (
          scrollPercent >= 60 ||
          scrollPercent === 'NaN' ||
          scrollPercent === false
        ) {
          if (props.isLoadingCards) {
            if (!props.isSearch) {
              props.getGalleryCards(props.cards, props.lastKey);
            } else {
              props.getSearchedCards(
                props.cards,
                props.searchedCards,
                props.lastKey
              );
            }
          }
        }
      }, 1000);

      return () => {
        clearInterval(checkHeightInterval);
      };
    }
  });

  useEffect(() => {
    let isMounted = true;
    window.removeEventListener('resize', isMobileChecker);
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
    return () => {
      isMounted = false;
    };
  }, []);

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

  const allCards = props.cards.map((card, index) => {
    const href =
      window.location.pathname.slice(0, 5) === '/card'
        ? card.id
        : 'card/' + card.id;
    let cardHeight = 0;
    let cardWidth = 250;
    if (isMobile) {
      cardWidth = deviceWidth / 2 - 16;
      let cardWidthPerc = (cardWidth * 100) / card.width;
      cardHeight = (card.height * cardWidthPerc) / 100 + 'px';
    } else {
      let cardWidthPerc = (cardWidth * 100) / card.width;
      cardHeight = (card.height * cardWidthPerc) / 100 + 'px';
    }
    const imgAltText =
      card.infoTitle + ' | ' + card.infoUsername + "' card - " + card.id;
    return (
      <div
        className="card-p card-gutter"
        key={card.infoDate}
        style={{ width: cardWidth + 'px' }}
      >
        <NavLink
          to={'' + href}
          className="card-link"
          tabIndex={100 + index}
          title={card.infoUsername + "'s card"}
        >
          <div className="card-p-top">
            <img
              src={card.fileURL}
              alt={imgAltText}
              style={{ minHeight: cardHeight, minWidth: cardWidth + 'px' }}
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

  return (
    <>
      <Gallery allCards={allCards} checker={checker} />
      <GalleryActions
        refresh={refresh}
        isLoading={props.isLoadingCards}
        isSearch={props.isSearch}
        setIsSearch={props.setIsSearch}
        updateGalleryCards={props.updateGalleryCards}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cards: state.galleryReducer.cards,
    searchedCards: state.galleryReducer.searchedCards,
    lastKey: state.galleryReducer.lastKey,
    isLoadingCards: state.galleryReducer.isLoadingCards,
    endLoadData: state.galleryReducer.endLoadData,
    isSearch: state.galleryReducer.isSearch,
  };
};

const mapDispatchToProps = {
  getGalleryCards,
  updateGalleryCards,
  getSearchedCards,
  setIsSearch,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
