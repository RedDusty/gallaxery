import React, { useContext, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFile from './UploadFile';
import './uploadFile.scss';

import firebase from 'firebase/app';
import { Redirect } from 'react-router';
import { UserContext } from '../../UserProvider';
import {
  ufFileUpload,
  ufTagDelete,
  ufTagParse,
  ufFileImageDelete,
  ufTextArea,
} from '../../redux/actions';
import { connect } from 'react-redux';

import tagDelIcon from '../../images/search/tagDelete.svg';

// CARD COLOR
// MINI-ALUBM (10 FILES IN ONE CARD MAX)

function UploadFileContainer(props) {
  const inputName = useRef(null);
  const { currentUser } = useContext(UserContext);
  let tags = 0;

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
    if (tags < 4 || tags >= 25) {
      document.documentElement.style.setProperty('--finfoLenTags', 'block');
    } else {
      document.documentElement.style.setProperty('--finfoLenTags', 'none');
    }
  }

  function tagKeyDown(e) {
    if (!(e.target.value.length > 25)) {
      if (tags < 25 && !(tags >= 25)) {
        if (tags < 4) {
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
    if (e.key === ' ') {
      tags = props.ufTags.length;
      if (tags < 4 || tags >= 25) {
        document.documentElement.style.setProperty('--finfoLenTags', 'block');
      } else {
        document.documentElement.style.setProperty('--finfoLenTags', 'none');
      }
      e.target.value = '';
    }
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
            <img src={tagDelIcon} alt="remove" />
          </button>
        </div>
      );
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const currentTime = Date.now();
    let imageURL = '';
    if (
      fileInfo.fileCode.length !== 0 &&
      props.ufTags.length > 3 &&
      props.ufTags.length < 26
    ) {
      console.log('Trying send image...');
      const file = fileInfo;
      const storageRef = firebase
        .storage()
        .ref()
        .child(
          '/usersImages/' +
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
      };
      await storageRef.putString(file.fileURL, 'data_url', metadata);
      imageURL = await storageRef.getDownloadURL();
      const firestore = await firebase
        .firestore()
        .collection('usersImages')
        .doc('image' + currentTime)
        .set({
          fileURL: imageURL,
          fileName: fileInfo.fileName,
          fileSize: fileInfo.fileSize,
          fileType: fileInfo.fileType,
          infoDate: currentTime,
          infoUsername: userInfo.username,
          infoPhotoURL: userInfo.photo,
          infoTitle: props.ufFile.textareaTitle,
          infoDescription: props.ufFile.textareaDescription,
          infoTags: props.ufTags,
        });
      console.log('File uploaded.');
    } else {
      if (fileInfo.fileCode.length === 0) console.log('File empty.');
      if (props.ufTags.length < 4)
        console.log(
          'Not enough tags. Need ' + (4 - props.ufTags.length) + ' more tags.'
        );
      if (props.ufTags.length > 25)
        console.log(
          'Not enough tags. Remove ' +
            (props.ufTags.length - 25) +
            ' more tags.'
        );
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
  ufTagDelete,
  ufFileUpload,
  ufFileImageDelete,
  ufTextArea,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFileContainer);
