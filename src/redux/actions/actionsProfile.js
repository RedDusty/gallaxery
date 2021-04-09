import {
  PR_USER_CARDS,
  PR_USER_INFO,
  PR_CARDS_LOAD,
  PR_CARDS_NEWLOAD,
} from '../types';

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
        cardId: doc.data().cardId,
      });
    });

    dispatch({ type: PR_USER_INFO, payload: { profile } });
  };
};

export const getProfileUserCards = (uid, lastKey, currentCards) => {
  return async (dispatch) => {
    dispatch({ type: PR_CARDS_LOAD });

    let cards = [];

    const getCardIdArray = await firebase
      .firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get();

    let cardIdArray = getCardIdArray.docs[0].data().cardId;
    let lastId = lastKey;
    const endIndex = lastKey + 4;
    let outOfBounds = false;

    for (let index = lastKey; index < endIndex; index++) {
      if (cardIdArray[index] === undefined) {
        outOfBounds = true;
        break;
      }
      const cardsData = await firebase
        .firestore()
        .collection('usersImages')
        .where('id', '==', cardIdArray[index])
        .get();

      cards.push(cardsData.docs[0].data());
      lastId = index;
    }

    dispatch({
      type: PR_USER_CARDS,
      payload: {
        currentCards,
        cards,
        lastId,
        outOfBounds,
      },
    });
  };
};

export const newProfileLoad = () => ({
  type: PR_CARDS_NEWLOAD,
});
