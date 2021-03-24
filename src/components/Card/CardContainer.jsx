import React, { useEffect, useState } from 'react';
import GalleryContainer from '../Gallery/GalleryContainer';
import Card from './Card';
import './card.scss';

import firebase from 'firebase/app';
import 'firebase/firestore';

async function getCard(key) {
  const data = await firebase
    .firestore()
    .collection('usersImages')
    .doc('image' + key);

  return new Promise((resolve, reject) => {
    data
      .get()
      .then((res) => {
        resolve({
          fileName: res.data().fileName,
          fileSize: res.data().fileSize,
          fileType: res.data().fileType,
          fileURL: res.data().fileURL,
          infoUsername: res.data().infoUsername,
          infoPhotoURL: res.data().infoPhotoURL,
          infoDate: res.data().infoDate,
          infoDescription: res.data().infoDescription,
          infoTags: res.data().infoTags,
          infoTitle: res.data().infoTitle,
          id: res.data().id,
          uid: res.data().uid,
        });
      })
      .catch((error) => {
        reject(error);
        console.log('Oops! Something is wrong!\n' + error);
      });
  });
}

const CardContainer = () => {
  const [card, setCard] = useState({
    fileName: 'Loading...',
    fileSize: 'Loading...',
    fileType: 'Loading...',
    fileURL: 'Loading...',
    infoUsername: 'Loading...',
    infoPhotoURL: 'Loading...',
    infoDate: 'Loading...',
    infoDescription: 'Loading...',
    infoTags: [],
    infoTitle: 'Loading...',
    id: 'Loading...',
  });

  useEffect(() => {
    async function getCardAsync() {
      const data = await getCard(window.location.pathname.substring(6));
      if (data) {
        setCard(data);
        if (data.infoTitle !== '') {
          document.title = data.infoTitle;
        } else {
          document.title = 'Gallaxery';
        }
      } else {
        // THROW ERROR
      }
    }

    getCardAsync();
  }, []);

  const cardTags = card.infoTags.map((tag, index) => {
    return (
      <div className={`tag-container-standard tag-container`} key={index}>
        <div className={`tag-text tag-text-standard`}>{tag.tag}</div>
      </div>
    );
  });

  return (
    <>
      <Card card={card} cardTags={cardTags} />
    </>
  );
};

export default CardContainer;
