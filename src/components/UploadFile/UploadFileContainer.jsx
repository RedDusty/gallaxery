import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFile from './UploadFile';
import './uploadFile.scss';

import firebase from 'firebase/app';
import { Redirect } from 'react-router';
import { UserContext } from '../../UserProvider';

function currentTimeFunc() {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'medium',
  })
    .format(new Date(Date.now()))
    .replace(/\//g, '.');
}

function UploadFileContainer(props) {
  const [file, setFile] = useState([]);
  const [currentTime, setCurrentTime] = useState();
  const inputName = useRef(null);
  const { currentUser } = useContext(UserContext);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*, video/*',
    onDrop: (acceptedFiles) => {
      setFile(
        acceptedFiles.map(
          (file) =>
            Object.assign(file, {
              source: URL.createObjectURL(file),
            }),
          URL.revokeObjectURL(file)
        )
      );
    },
    multiple: false,
    noKeyboard: true,
    noClick: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(currentTimeFunc());
    }, 1000);
    return () => clearTimeout(timer);
  });

  if (!currentUser) {
    console.log('Redirect');
    return <Redirect to="/" />;
  }

  const userInfo = {
    username: currentUser.displayName,
    photo: currentUser.photoURL,
  };

  function clearFile() {
    setFile([]);
  }

  const fileInfo = file.map((file) => {
    if (inputName.current.value === '') {
      inputName.current.value = file.name;
    }
    return {
      name: file.name,
      source: file.source,
      type: file.type,
      code: 'return',
    };
  });

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
    getRootProps,
    getInputProps,
    open,
    fileInfo,
    inputName,
    userInfo,
    currentTime,
  };

  const functions = { clearFile };
  return <UploadFile vars={vars} functions={functions} />;
}

export default UploadFileContainer;
