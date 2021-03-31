import { CA_CARD_INFO, CA_CARD_LOAD, CA_CARD_LIKE } from '../types';

import firebase from 'firebase/app';
import 'firebase/firestore';

export const getCardInfo = (key, uid) => {
  return async (dispatch) => {
    dispatch({ type: CA_CARD_LOAD });

    const cardData = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + key)
      .get();

    let card = {
      fileName: '',
      fileSize: '',
      fileType: '',
      fileURL: '',
      infoUsername: '',
      infoPhotoURL: '',
      infoDate: 0,
      infoDescription: '',
      infoTags: [],
      infoTitle: '',
      id: undefined,
      uid: '',
      likesCount: 0,
    };
    if (!cardData.exists) {
      dispatch({
        type: CA_CARD_INFO,
        payload: { card },
      });
    } else {
      // const cardLikeData = await firebase
      //   .firestore()
      //   .collection('usersImages')
      //   .doc('image' + key)
      //   .collection('likesInfo')
      //   .doc(uid)
      //   .get();

      // console.log(cardLikeData.data().isLiked);

      card = {
        fileName: cardData.data().fileName,
        fileSize: cardData.data().fileSize,
        fileType: cardData.data().fileType,
        fileURL: cardData.data().fileURL,
        infoUsername: cardData.data().infoUsername,
        infoPhotoURL: cardData.data().infoPhotoURL,
        infoDate: cardData.data().infoDate,
        infoDescription: cardData.data().infoDescription,
        infoTags: cardData.data().infoTags,
        infoTitle: cardData.data().infoTitle,
        id: cardData.data().id,
        uid: cardData.data().uid,
        likesCount: cardData.data().likesCount,
      };

      dispatch({
        type: CA_CARD_INFO,
        payload: { card },
      });
    }
  };
};

export const setCardLike = (key, uid) => {
  return async (dispatch) => {
    dispatch({ type: CA_CARD_LIKE, payload: {} });
  };
};
