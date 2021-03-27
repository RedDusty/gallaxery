import { PR_USER_CARDS, PR_USER_INFO, PR_CARDS_LOAD } from '../types';

import firebase from 'firebase/app';
import 'firebase/firestore';

export const getProfileUserInfo = (uid) => {
  return async (dispatch) => {
    let profile = {};

    const profileData = await firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .limit(1)
      .get();

    profileData.forEach((doc) => {
      profile = Object.assign(profile, {
        displayName: doc.data().displayName,
        photoURLAlt: doc.data().photoURLAlt,
        photoURL: doc.data().photoURL,
        uid: doc.data().uid,
      });
    });

    dispatch({ type: PR_USER_INFO, payload: { profile } });
  };
};

export const getProfileUserCards = (uid, lastKey) => {
  return async (dispatch) => {
    dispatch({ type: PR_CARDS_LOAD });

    let cards = [];
    let lastKey = '';

    const cardsData = await firebase
      .firestore()
      .collection('usersImages')
      .where('uid', '==', uid)
      // .limit(10)
      .get();

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

    dispatch({
      type: PR_USER_CARDS,
      payload: {
        cards,
        lastKey,
      },
    });
  };
};
