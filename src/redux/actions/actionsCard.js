import {
  CA_CARD_INFO,
  CA_CARD_LOAD,
  CA_GET_ISLIKED,
  CA_CARD_DELETE,
} from '../types';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

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

export const setCardLike = (card, uid) => {
  return async (dispatch) => {
    const cardLikeCountRef = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + card.id);

    cardLikeCountRef.get().then((doc) => {
      if (doc.data().likesCount !== undefined) {
        if (card.isLiked === false) {
          cardLikeCountRef.update({
            likesCount: doc.data().likesCount + 1,
          });
          Object.assign(card, { likesCount: doc.data().likesCount + 1 });
        } else {
          cardLikeCountRef.update({
            likesCount: doc.data().likesCount - 1,
          });
          Object.assign(card, { likesCount: doc.data().likesCount - 1 });
        }
      } else {
        cardLikeCountRef.update({
          likesCount: 1,
        });
        Object.assign(card, { likesCount: 1 });
      }
    });

    const setCardLikeData = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + card.id)
      .collection('likesInfo')
      .doc(uid)
      .set({ isLiked: !card.isLiked });

    const getCardLikeData = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + card.id)
      .collection('likesInfo')
      .doc(uid)
      .get();

    Object.assign(card, { isLiked: getCardLikeData.data().isLiked });

    dispatch({ type: CA_GET_ISLIKED, payload: { card } });
  };
};

export const getCardIsLiked = (card, uid) => {
  return async (dispatch) => {
    const getCardLikeData = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + card.id)
      .collection('likesInfo')
      .doc(uid)
      .get();

    if (getCardLikeData.data() !== undefined) {
      Object.assign(card, { isLiked: getCardLikeData.data().isLiked });
    } else if (getCardLikeData.data() === undefined) {
      Object.assign(card, { isLiked: false });
    } else {
      Object.assign(card, { isLiked: 'Load error' });
    }

    dispatch({
      type: CA_GET_ISLIKED,
      payload: {
        card,
      },
    });
  };
};

export const deleteCard = (key, uid, history) => {
  return async (dispatch) => {
    dispatch({ type: CA_CARD_DELETE, payload: { process: true } });
    const cardData = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + key)
      .get();

    const deleteCardLikes = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + key)
      .collection('likesInfo')
      .get();
    deleteCardLikes.docs.forEach((doc) => {
      doc.ref.delete();
    });

    const fileRef = firebase
      .storage()
      .ref()
      .child(
        '/usersImages/' +
          '__CARD__' +
          cardData.data().id +
          '__TIME__' +
          cardData.data().infoDate +
          '__NAME__' +
          cardData.data().fileName
      );
    fileRef.delete();

    const deleteCard = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + key)
      .delete();

    const getUser = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get();

    const newCardId = getUser.data().cardId;
    newCardId.splice(newCardId.indexOf(key), 1);

    const userCardIdUpdate = await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .update({
        cardId: newCardId,
      });

    history.push('/profile/' + uid);

    dispatch({ type: CA_CARD_DELETE, payload: { process: false } });
  };
};
