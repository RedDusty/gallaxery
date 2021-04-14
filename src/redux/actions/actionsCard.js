import {
  CA_CARD_INFO,
  CA_CARD_LOAD,
  CA_GET_ISLIKED,
  CA_CARD_DELETE,
  CA_CARD_COMMENTS,
  CA_CARD_COMMENTS_LOAD,
  CA_CARD_COMMENT_DELETE,
  CA_CARD_TEXTAREA,
  CA_CARD_COMMENTS_SEND,
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
    dispatch({ type: CA_GET_ISLIKED, payload: { card, type: 'load' } });
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

    dispatch({ type: CA_GET_ISLIKED, payload: { card, type: 'endLoad' } });
  };
};

export const getCardIsLiked = (card, uid) => {
  return async (dispatch) => {
    dispatch({
      type: CA_GET_ISLIKED,
      payload: {
        card,
        type: 'load',
      },
    });
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
        type: 'endLoad',
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

export const getCardComments = (
  currentComments,
  cardId,
  commentsLastKey = ''
) => {
  return async (dispatch) => {
    dispatch({
      type: CA_CARD_COMMENTS_LOAD,
    });

    let comments = [];
    let newLastKey = commentsLastKey;
    let endCommentsLoadData = false;

    const data = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + cardId)
      .collection('comments')
      .orderBy('id', 'desc')
      .startAfter(commentsLastKey)
      .limit(6)
      .get();

    data.forEach((doc) => {
      comments.push({
        comment: doc.data().comment,
        id: doc.data().id,
        infoDate: doc.data().infoDate,
        infoDateStr: doc.data().infoDateStr,
        infoPhotoURL: doc.data().infoPhotoURL,
        infoUsername: doc.data().infoUsername,
        uid: doc.data().uid,
      });
      newLastKey = doc.data().id;
    });
    if (comments.length === 0) {
      endCommentsLoadData = true;
    } else {
      endCommentsLoadData = false;
    }
    dispatch({
      type: CA_CARD_COMMENTS,
      payload: {
        comments,
        currentComments,
        cardId,
        commentsLastKey: newLastKey,
        endCommentsLoadData,
      },
    });
  };
};

export const ccTextArea = (textareaRef, textareaContRef, symbolCountRef) => ({
  type: CA_CARD_TEXTAREA,
  payload: {
    textareaRef,
    textareaContRef,
    symbolCountRef,
  },
});

export const ccSend = (
  comment,
  user,
  cardId,
  textareaRef,
  comments,
  symbolCountRef,
  textareaContRef
) => {
  return async (dispatch) => {
    textareaRef.current.value = '';
    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
    const cardCommentsRef = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + cardId)
      .collection('comments');
    let getLastId = (await cardCommentsRef.orderBy('id', 'desc').limit(1).get())
      .docs[0];

    if (getLastId === undefined) {
      getLastId = 1;
    } else {
      getLastId = getLastId.data().id + 1;
    }

    const newComment = {
      id: getLastId,
      comment: comment.slice(0, 250),
      infoDate: Date.now(),
      infoDateStr: formatDate(Date.now()),
      infoPhotoURL: user.photoURL,
      infoUsername: user.displayName,
      uid: user.uid,
    };

    const setNewComment = cardCommentsRef
      .doc('comment' + getLastId)
      .set(newComment);

    comments.push(newComment);

    const newCommentsArray = comments;

    dispatch({
      type: CA_CARD_COMMENTS_SEND,
      payload: {
        comments: newCommentsArray,
        refs: {
          textareaRef,
          textareaContRef,
          symbolCountRef,
        },
      },
    });
  };
};
export const ccDelete = (comment, cardId, comments) => {
  return async (dispatch) => {
    dispatch({
      type: CA_CARD_COMMENT_DELETE,
      payload: { comments: comments, commentId: comment.id },
    });
    const frfrfrf = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + cardId)
      .collection('comments')
      .doc('comment' + comment.id)
      .get();
    const deleteComment = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + cardId)
      .collection('comments')
      .doc('comment' + comment.id)
      .delete();
  };
};
