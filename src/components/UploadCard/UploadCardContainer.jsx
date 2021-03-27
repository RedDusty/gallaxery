import React, { useContext, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadCard from './UploadCard';
import './uploadCard.scss';

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { Redirect } from 'react-router';
import { UserContext } from '../../UserProvider';
import {
  ucFileUpload,
  ucTagDelete,
  ucTagParse,
  ucTagKeyUp,
  ucFileImageDelete,
  ucTextArea,
} from '../../redux/actions/actionsUploadCard';
import { connect } from 'react-redux';

import tagDelIcon from '../../images/search/tagDelete.svg';

// CARD COLOR
// MINI-ALUBM (10 CARDS IN ONE CARD MAX)

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

async function CreateCard(data, history) {
  const fileInfo = data.fileInfo;
  const ucTags = data.ucTags;
  const ucCard = data.ucCard;
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
      infoTitle: ucCard.textareaTitle,
      infoDescription: ucCard.textareaDescription,
      infoTags: ucTags,
      id: id,
    });
  console.log('Card uploaded. Redirect to uploaded card...');
  history.push('/card/' + id);
}

function UploadCardContainer(props) {
  const inputName = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const { currentUser } = useContext(UserContext);
  let tags = 0;
  document.title = 'Card uploader';

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0].size > 5242880) {
        return <div>Too large!</div>;
      } else {
        props.ucFileUpload(acceptedFiles[0]);
      }
    },
    multiple: false,
    noKeyboard: true,
    noClick: true,
  });

  function queryUpdater(e = '') {
    props.ucTagParse(e, tags);
    tags = props.ucTags.length;
    if (tags < 2 || tags >= 25) {
      document.documentElement.style.setProperty('--cinfoLenTags', 'block');
    } else {
      document.documentElement.style.setProperty('--cinfoLenTags', 'none');
    }
  }

  function tagKeyDown(e) {
    if (!(e.target.value.length > 25)) {
      if (tags < 25 && !(tags >= 25)) {
        if (tags < 2) {
          document.documentElement.style.setProperty('--cinfoLenTags', 'block');
        } else {
          document.documentElement.style.setProperty('--cinfoLenTags', 'none');
        }
        props.ucTagParse(e, tags);
        queryUpdater();
      } else {
        document.documentElement.style.setProperty('--cinfoLenTags', 'block');
      }
    }
  }
  function tagKeyUp(e) {
    tags = props.ucTags.length;
    if (tags < 2 || tags >= 25) {
      document.documentElement.style.setProperty('--cinfoLenTags', 'block');
    } else {
      document.documentElement.style.setProperty('--cinfoLenTags', 'none');
    }
    props.ucTagKeyUp(e);
  }

  function tagDelete(tagId) {
    props.ucTagDelete(tagId, tags);
    tags = props.ucTags.length;
    queryUpdater();
  }

  function textareaAction(textarea, areaAction) {
    props.ucTextArea(textarea, areaAction);
  }

  function clearCard() {
    props.ucFileImageDelete();
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
    fileURL: props.ucCard.fileURL,
    fileName: props.ucCard.fileName,
    fileSize: props.ucCard.fileSize,
    fileType: props.ucCard.fileType,
    fileCode: props.ucCard.fileCode,
  };

  const cardTags = props.ucTags
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
      props.ucTags.length > 1 &&
      props.ucTags.length < 26
    ) {
      getLastId()
        .then((res) => {
          const data = {
            fileInfo: fileInfo,
            ucTags: props.ucTags,
            ucCard: props.ucCard,
            userInfo: userInfo,
            id: Number(res) + 1,
          };
          CreateCard(data, props.history);
        })
        .catch((err) => {});
    } else {
      if (fileInfo.cardCode.length === 0) {
        console.log('Card empty.');
        setIsUploading(false);
      }
      if (props.ucTags.length < 2) {
        console.log(
          'Not enough tags. Need ' + (2 - props.ucTags.length) + ' more tags.'
        );
        setIsUploading(false);
      }
      if (props.ucTags.length > 25) {
        console.log(
          'Not enough tags. Remove ' +
            (props.ucTags.length - 25) +
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
    cardTags,
    isUploading,
  };

  const functions = {
    clearCard,
    textareaAction,
    tagKeyDown,
    tagKeyUp,
    onSubmit,
  };
  return <UploadCard vars={vars} functions={functions} />;
}

const mapStateToProps = (state) => {
  return {
    ucTags: state.uploadCardReducer.uc_tags,
    ucCard: state.uploadCardReducer,
  };
};

const mapDispatchToProps = {
  ucTagParse,
  ucTagKeyUp,
  ucTagDelete,
  ucFileUpload,
  ucFileImageDelete,
  ucTextArea,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadCardContainer);
