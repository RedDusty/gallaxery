import React, { useEffect } from 'react';
import Gallery from './Gallery';

import { getGalleryCards } from '../../redux/actions/actionsGallery';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

const GalleryContainer = (props) => {
  document.title = 'Gallaxery';
  useEffect(() => {
    props.getGalleryCards(props.cards, props.lastKey);
  }, []);

  function checker(loadingElementRef) {
    if (props.isLoadingCards) {
      return (
        <div className="loading">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
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

  const allCards = props.cards.map((card, index) => {
    const href =
      window.location.pathname.slice(0, 5) === '/card'
        ? card.id
        : 'card/' + card.id;
    return (
      <div className="card-p" key={card.infoDate}>
        <NavLink to={'' + href} className="card-link" tabIndex={100 + index}>
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

  const vars = {
    allCards,
  };

  const functions = {
    checker,
  };

  return <Gallery vars={vars} functions={functions} />;
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
