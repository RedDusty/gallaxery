import React, { useEffect, useState } from 'react';
import Gallery from './Gallery';

import { blocksConfirmedLoading } from '../../redux/actions';
import { connect } from 'react-redux';

import firebase from 'firebase/app';
import 'firebase/firestore';

import { NavLink } from 'react-router-dom';

async function getImages(key) {
  try {
    const data = await firebase
      .firestore()
      .collection('usersImages')
      .orderBy('id', 'desc')
      .startAfter(key)
      // .limit(10)
      .get();

    let cards = [];
    let lastKey = '';
    data.forEach((doc) => {
      cards.push({
        infoDate: doc.data().infoDate,
        uid: doc.data().uid,
        infoPhotoURL: doc.data().infoPhotoURL,
        infoTitle: doc.data().infoTitle,
        fileURL: doc.data().fileURL,
        id: doc.data().id,
      });
      lastKey = doc.data().id;
    });
    return { cards, lastKey };
  } catch (e) {}
}

const GalleryContainer = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [cards, setCards] = useState([]);
  const [lastKey, setLastKey] = useState('');

  document.title = 'Gallaxery';

  useEffect(() => {
    setIsLoading(true);
    getImages(lastKey)
      .then((res) => {
        setCards(res.cards);
        setLastKey(res.lastKey);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  function checker(loadingElementRef) {
    if (isLoading) {
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

  const allCards = cards.map((block, index) => {
    const href =
      window.location.pathname.slice(0, 5) === '/card'
        ? block.id
        : 'card/' + block.id;
    return (
      <div className="card-p" key={block.infoDate}>
        <NavLink to={'' + href} className="card-link" tabIndex={100 + index}>
          <div className="card-p-top">
            <img src={block.fileURL} alt="" />
          </div>
          <div className="card-p-bottom">
            <img src={block.infoPhotoURL} alt="" />
            <p>{block.infoTitle}</p>
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
    blocks: state.galleryReducer.blocks,
    update: state.galleryReducer.update,
  };
};

const mapDispatchToProps = {
  blocksConfirmedLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
