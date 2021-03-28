import { CA_CARD_INFO, CA_CARD_LOAD } from '../types';

import firebase from 'firebase/app';
import 'firebase/firestore';

export const getCardInfo = (key) => {
  return async (dispatch) => {
    dispatch({ type: CA_CARD_LOAD });

    const cardData = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + key)
      .get();

    const card = {
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
    };

    dispatch({
      type: CA_CARD_INFO,
      payload: { card },
    });
  };
};
