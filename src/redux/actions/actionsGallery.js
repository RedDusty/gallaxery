import { GLR_CARD_LOAD, GLR_GET_CARDS, GLR_CARD_NEWLOAD } from '../types';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

export const getGalleryCards = (currentCards, lastKey = '') => {
  return async (dispatch) => {
    dispatch({
      type: GLR_CARD_LOAD,
    });

    let cards = [];
    let newLastKey = lastKey;
    let endLoadData = false;

    const data = await firebase
      .firestore()
      .collection('usersImages')
      .orderBy('id', 'desc')
      .startAfter(lastKey)
      .limit(6)
      .get();

    data.forEach((doc) => {
      cards.push({
        infoDate: doc.data().infoDate,
        uid: doc.data().uid,
        infoPhotoURL: doc.data().infoPhotoURL,
        infoTitle: doc.data().infoTitle,
        fileURL: doc.data().fileURL,
        id: doc.data().id,
        height: doc.data().height,
        width: doc.data().width,
      });
      newLastKey = doc.data().id;
    });
    if (cards.length === 0) {
      endLoadData = true;
    } else {
      endLoadData = false;
    }
    dispatch({
      type: GLR_GET_CARDS,
      payload: {
        cards,
        currentCards,
        lastKey: newLastKey,
        endLoadData,
      },
    });
  };
};

export const updateGalleryCards = () => ({
  type: GLR_CARD_NEWLOAD,
});
