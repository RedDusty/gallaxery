import { GLR_CARD_LOAD, GLR_GET_CARDS } from '../types';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

export const getGalleryCards = (currentCards, lastKey = 0) => {
  return async (dispatch) => {
    dispatch({
      type: GLR_CARD_LOAD,
    });

    let cards = [];
    let newLastKey = lastKey;

    const data = await firebase
      .firestore()
      .collection('usersImages')
      .orderBy('id', 'desc')
      .startAfter(lastKey)
      .get();
    // .limit(10)

    data.forEach((doc) => {
      cards.push({
        infoDate: doc.data().infoDate,
        uid: doc.data().uid,
        infoPhotoURL: doc.data().infoPhotoURL,
        infoTitle: doc.data().infoTitle,
        fileURL: doc.data().fileURL,
        id: doc.data().id,
      });
      newLastKey = doc.data().id;
    });
    dispatch({
      type: GLR_GET_CARDS,
      payload: {
        cards,
        currentCards,
        lastKey: newLastKey,
      },
    });
  };
};
