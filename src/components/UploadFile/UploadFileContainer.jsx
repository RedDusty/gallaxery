import React, { useContext, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFile from './UploadFile';
import './uploadFile.scss';

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { Redirect } from 'react-router';
import { UserContext } from '../../UserProvider';
import {
  ufFileUpload,
  ufTagDelete,
  ufTagParse,
  ufTagKeyUp,
  ufFileImageDelete,
  ufTextArea,
} from '../../redux/actions';
import { connect } from 'react-redux';

import tagDelIcon from '../../images/search/tagDelete.svg';

// CARD COLOR
// MINI-ALUBM (10 FILES IN ONE CARD MAX)

async function getLastId() {
  try {
    const data = await firebase
      .firestore()
      .collection('usersImages')
      .orderBy('id', 'desc')
      .limit(1)
      .get();
    let lastId = '';
    data.forEach((doc) => {
      lastId = doc.data().id;
    });
    return lastId;
  } catch (e) {}
}

async function CreateFile(data, history) {
  const fileInfo = data.fileInfo;
  const ufTags = data.ufTags;
  const ufFile = data.ufFile;
  const userInfo = data.userInfo;
  const id = data.id;
  const currentTime = Date.now();
  let imageURL = '';
  console.log('Trying send image...');
  const file = fileInfo;
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
      infoTitle: ufFile.textareaTitle,
      infoDescription: ufFile.textareaDescription,
      infoTags: ufTags,
      id: id,
    });
  console.log('File uploaded. Redirect to uploaded card...');
  history.push('/card/' + id);
}

function UploadFileContainer(props) {
  const inputName = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const { currentUser } = useContext(UserContext);
  let tags = 0;
  document.title = 'File uploader';

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0].size > 5242880) {
        return <div>Too large!</div>;
      } else {
        props.ufFileUpload(acceptedFiles[0]);
      }
    },
    multiple: false,
    noKeyboard: true,
    noClick: true,
  });

  function queryUpdater(e = '') {
    props.ufTagParse(e, tags);
    tags = props.ufTags.length;
    if (tags < 2 || tags >= 25) {
      document.documentElement.style.setProperty('--finfoLenTags', 'block');
    } else {
      document.documentElement.style.setProperty('--finfoLenTags', 'none');
    }
  }

  function tagKeyDown(e) {
    if (!(e.target.value.length > 25)) {
      if (tags < 25 && !(tags >= 25)) {
        if (tags < 2) {
          document.documentElement.style.setProperty('--finfoLenTags', 'block');
        } else {
          document.documentElement.style.setProperty('--finfoLenTags', 'none');
        }
        props.ufTagParse(e, tags);
        queryUpdater();
      } else {
        document.documentElement.style.setProperty('--finfoLenTags', 'block');
      }
    }
  }
  function tagKeyUp(e) {
    tags = props.ufTags.length;
    if (tags < 2 || tags >= 25) {
      document.documentElement.style.setProperty('--finfoLenTags', 'block');
    } else {
      document.documentElement.style.setProperty('--finfoLenTags', 'none');
    }
    props.ufTagKeyUp(e);
  }

  function tagDelete(tagId) {
    props.ufTagDelete(tagId, tags);
    tags = props.ufTags.length;
    queryUpdater();
  }

  function textareaAction(textarea, areaAction) {
    props.ufTextArea(textarea, areaAction);
  }

  function clearFile() {
    props.ufFileImageDelete();
  }

  if (!currentUser) {
    console.log('Redirect');
    return <Redirect to="/" />;
  }

  const userInfo = {
    uid: currentUser.uid,
    username: currentUser.displayName,
    photo: currentUser.photoURL,
  };

  const fileInfo = {
    fileURL: props.ufFile.fileURL,
    fileName: props.ufFile.fileName,
    fileSize: props.ufFile.fileSize,
    fileType: props.ufFile.fileType,
    fileCode: props.ufFile.fileCode,
  };

  const fileTags = props.ufTags
    .filter((tag) => tag !== undefined)
    .map((tag, index) => {
      return (
        <div className={`tag-container-standard tag-container`} key={index}>
          <div className={`tag-text tag-text-standard`}>{tag.tag}</div>
          <button
            className="tag-delete btn btn-icon tag-btn"
            onClick={(e) => {
              e.preventDefault();
              tagDelete(index);
            }}
          >
            <img src={tagDelIcon} data-alt="✖" />
          </button>
        </div>
      );
    });

  const onSubmit = async (e) => {
    setIsUploading(true);
    e.preventDefault();
    if (
      fileInfo.fileCode.length !== 0 &&
      props.ufTags.length > 1 &&
      props.ufTags.length < 26
    ) {
      getLastId()
        .then((res) => {
          const data = {
            fileInfo: fileInfo,
            ufTags: props.ufTags,
            ufFile: props.ufFile,
            userInfo: userInfo,
            id: Number(res) + 1,
          };
          CreateFile(data, props.history);
        })
        .catch((err) => {});
    } else {
      if (fileInfo.fileCode.length === 0) {
        console.log('File empty.');
        setIsUploading(false);
      }
      if (props.ufTags.length < 2) {
        console.log(
          'Not enough tags. Need ' + (2 - props.ufTags.length) + ' more tags.'
        );
        setIsUploading(false);
      }
      if (props.ufTags.length > 25) {
        console.log(
          'Not enough tags. Remove ' +
            (props.ufTags.length - 25) +
            ' more tags.'
        );
        setIsUploading(false);
      }
    }
  };

  const vars = {
    getRootProps,
    getInputProps,
    open,
    fileInfo,
    inputName,
    userInfo,
    fileTags,
    isUploading,
  };

  const functions = {
    clearFile,
    textareaAction,
    tagKeyDown,
    tagKeyUp,
    onSubmit,
  };
  return <UploadFile vars={vars} functions={functions} />;
}

const mapStateToProps = (state) => {
  return {
    ufTags: state.uploadFileReducer.uf_tags,
    ufFile: state.uploadFileReducer,
  };
};

const mapDispatchToProps = {
  ufTagParse,
  ufTagKeyUp,
  ufTagDelete,
  ufFileUpload,
  ufFileImageDelete,
  ufTextArea,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFileContainer);
