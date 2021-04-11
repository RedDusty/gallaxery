import {
  UC_TAG_PARSE,
  UC_TAG_KEYUP,
  UC_TAG_DELETE,
  UC_FILEUPLOAD,
  UC_FILEIMAGEDLETE,
  UC_TEXTAREA,
  UC_CARD_CLEANER,
} from '../types';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

export const ucTagParse = (e) => ({
  type: UC_TAG_PARSE,
  payload: {
    e,
  },
});

export const ucTagKeyUp = (e) => ({
  type: UC_TAG_KEYUP,
  payload: {
    e,
  },
});

export const ucTagDelete = (tagId) => ({
  type: UC_TAG_DELETE,
  payload: {
    tagId,
  },
});

export const ucFileUpload = (file) => (dispatch) => {
  const image = new Image();
  const webpImage = new Image();
  const ctx = document.createElement('canvas');
  const reader = new FileReader();
  reader.onloadend = () => {
    if (file.type.substring(6) !== 'gif') {
      image.onload = () => {
        ctx.width = image.width;
        ctx.height = image.height;
        ctx.getContext('2d').drawImage(image, 0, 0);
        webpImage.src = ctx.toDataURL('image/webp');
        Object.assign(file, {
          source: webpImage.src,
          height: image.height,
          width: image.width,
        });
        dispatch({
          type: UC_FILEUPLOAD,
          payload: { file },
        });
      };
    } else {
      image.onload = () => {
        Object.assign(file, {
          source: reader.result,
          height: image.height,
          width: image.width,
        });
        dispatch({
          type: UC_FILEUPLOAD,
          payload: { file },
        });
      };
    }

    image.src = reader.result;
  };
  reader.readAsDataURL(file);
};

export const ucFileImageDelete = () => ({
  type: UC_FILEIMAGEDLETE,
});

export const ucTextArea = (textarea, areaAction) => ({
  type: UC_TEXTAREA,
  payload: {
    textarea,
    areaAction,
  },
});

export const ucCreateCard = (data, history) => {
  return async (dispatch) => {
    let lastId = '';
    let imageURL = '';
    let infoDateStr = '';

    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    infoDateStr = formatDate(Date.now());

    // Get lastId
    const getLastId = await firebase
      .firestore()
      .collection('usersImages')
      .orderBy('id', 'desc')
      .limit(1)
      .get();
    getLastId.forEach((doc) => {
      lastId = doc.data().id;
    });

    const fileInfo = data.fileInfo;
    const ucTags = data.ucTags;
    const ucCard = data.ucCard;
    const userInfo = data.userInfo;
    const id = Number(lastId) + 1;
    const currentTime = Date.now();
    console.log('Trying send image...');
    const file = fileInfo;

    // FB Storage image
    const storageRef = firebase
      .storage()
      .ref()
      .child(
        '/usersImages/' +
          '__CARD__' +
          id +
          '__TIME__' +
          currentTime +
          '__NAME__' +
          file.fileName
      );
    const metadata = {
      name: file.fileName,
      size: file.fileSize,
      contentType: file.fileType,
      time: currentTime,
      id: id,
    };
    await storageRef.putString(file.fileURL, 'data_url', metadata);
    imageURL = await storageRef.getDownloadURL();

    // Create Firestore Doc
    const storeUsersImages = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + id)
      .set({
        fileURL: imageURL,
        fileName: fileInfo.fileName,
        fileSize: fileInfo.fileSize,
        fileType: fileInfo.fileType,
        infoDateStr: infoDateStr,
        infoDate: currentTime,
        uid: userInfo.uid,
        infoUsername: userInfo.username,
        infoPhotoURL: userInfo.photo,
        infoTitle: ucCard.textareaTitle,
        infoDescription: ucCard.textareaDescription,
        infoTags: ucTags,
        id: id,
        height: ucCard.height,
        width: ucCard.width,
        likeCount: 0,
      });

    // add card id to profile
    const storeProfileImages = await firebase
      .firestore()
      .collection('users')
      .doc(userInfo.uid);

    if ((await storeProfileImages.get()).data().cardId) {
      let getArrayCards = (await storeProfileImages.get()).data();

      getArrayCards.cardId.push(id);

      const updateArrayCards = storeProfileImages.update({
        cardId: getArrayCards.cardId,
      });
    } else {
      const setArrayCards = storeProfileImages.update({
        cardId: [id],
      });
    }

    dispatch({
      type: UC_CARD_CLEANER,
    });
    history.push('/card/' + id);
  };
};
