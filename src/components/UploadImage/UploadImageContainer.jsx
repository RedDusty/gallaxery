import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadImage from './UploadImage';
import './uploadImage.scss';

import firebase from 'firebase/app';

function UploadImageContainer(props) {
  const [files, setFiles] = useState([]);

  const onFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const renderImages = (images, index) => {
    return images.map((img) => {
      return <img src={img} alt="" key={img} />;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const getLastId = await firebase
      .firestore()
      .collection('confirmed')
      .orderBy('id', 'desc')
      .limit(1)
      .get();
  };

  const vars = {
    files,
  };

  const functions = {
    onFileChange,
    renderImages,
  };
  return <UploadImage vars={vars} functions={functions} />;
}

export default UploadImageContainer;
