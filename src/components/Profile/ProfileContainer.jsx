import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import './profile.scss';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { NavLink, Redirect } from 'react-router-dom';

async function getProfile(uid, key) {
  try {
    // GET CARDS OF USER
    const cardsData = await firebase
      .firestore()
      .collection('usersImages')
      .where('uid', '==', uid)
      // .limit(10)
      .get();
    let cards = [];
    let lastKey = '';
    cardsData.forEach((doc) => {
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

    // GET USER INFO
    const profileData = await firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .limit(1)
      .get();
    let profile = {};
    profileData.forEach((doc) => {
      profile = Object.assign(profile, {
        displayName: doc.data().displayName,
        photoURLAlt: doc.data().photoURLAlt,
        photoURL: doc.data().photoURL,
        uid: doc.data().uid,
      });
    });

    return { profile, cards, lastKey };
  } catch (e) {}
}

function ProfileContainer() {
  const [redirect, setRedirect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let isNotLogged = true;
  const [userInfo, setUserInfo] = useState({
    displayName: 'Loading username...',
    photoURLAlt: 'Loading photo...',
    photoURL: 'Loading photo...',
    uid: '',
  });

  const [cards, setCards] = useState([]);
  const [lastKey, setLastKey] = useState('');

  useEffect(() => {
    setIsLoading(true);
    async function getProfileAsync() {
      const data = await getProfile(
        window.location.pathname.substring(9),
        lastKey
      );

      if (data) {
        setCards(data.cards);
        setLastKey(data.lastKey);
        setUserInfo(data.profile);
        setIsLoading(false);
      }
    }

    getProfileAsync();
  }, [window.location.pathname.substring(9)]);

  useEffect(() => {
    setIsLoading(true);
    async function getProfileAsync() {
      const data = await getProfile(
        window.location.pathname.substring(9),
        lastKey
      );

      if (data) {
        setCards(data.cards);
        setLastKey(data.lastKey);
        setUserInfo(data.profile);
        setIsLoading(false);
      }
    }

    getProfileAsync();
  }, []);
  if (userInfo.displayName !== 'Loading username...') {
    document.title = userInfo.displayName;
  } else {
    document.title = 'Profile';
  }

  const allCards = cards.map((block, index) => {
    return (
      <div className="card-p" key={block.infoDate}>
        <NavLink
          to={'/card/' + block.id}
          className="card-link"
          tabIndex={100 + index}
        >
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

  const vars = { userInfo, allCards };
  const functions = {
    checker,
  };

  return <Profile vars={vars} functions={functions} />;
}

export default ProfileContainer;
