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
        });
        dispatch({
          type: UC_FILEUPLOAD,
          payload: { file },
        });
      };
    } else {
      Object.assign(file, {
        source: reader.result,
      });
      dispatch({
        type: UC_FILEUPLOAD,
        payload: { file },
      });
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
    const firestore = await firebase
      .firestore()
      .collection('usersImages')
      .doc('image' + id)
      .set({
        fileURL: imageURL,
        fileName: fileInfo.fileName,
        fileSize: fileInfo.fileSize,
        fileType: fileInfo.fileType,
        infoDate: currentTime,
        uid: userInfo.uid,
        infoUsername: userInfo.username,
        infoPhotoURL: userInfo.photo,
        infoTitle: ucCard.textareaTitle,
        infoDescription: ucCard.textareaDescription,
        infoTags: ucTags,
        id: id,
      });

    dispatch({
      type: UC_CARD_CLEANER,
    });
    history.push('/card/' + id);
  };
};
