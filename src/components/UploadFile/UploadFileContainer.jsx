import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFile from './UploadFile';
import './uploadFile.scss';

import firebase from 'firebase/app';
import { Redirect } from 'react-router';
import { UserContext } from '../../UserProvider';
import { ufTagDelete, ufTagParse } from '../../redux/actions';
import { connect } from 'react-redux';

//CARD COLOR, MINI-ALUBM (10 FILES IN ONE CARD MAX)

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
  let tags = 0;

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

  function queryUpdater(e = '') {
    props.ufTagParse(e, tags);
    tags = props.ufTags.length;
    if (tags < 4) {
      document.documentElement.style.setProperty('--finfoLenTags', 'block');
    } else {
      document.documentElement.style.setProperty('--finfoLenTags', 'none');
    }
  }

  function tagKeyDown(e) {
    if (tags < 25) {
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
  function tagKeyUp(e) {
    if (e.key === ' ') {
      tags = props.ufTags.length;
      if (tags < 4) {
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

  function textareaAction(e) {
    if (
      e.target.classList[0] === 'finfo-comment' &&
      e.target.value.length > 1000
    ) {
      document.documentElement.style.setProperty('--finfoLenComment', 'block');
    } else if (
      e.target.classList[0] === 'finfo-comment' &&
      e.target.value.length < 1001
    ) {
      document.documentElement.style.setProperty('--finfoLenComment', 'none');
    }
    if (e.target.classList[0] === 'finfo-name' && e.target.value.length > 500) {
      document.documentElement.style.setProperty('--finfoLenName', 'block');
    } else if (
      e.target.classList[0] === 'finfo-name' &&
      e.target.value.length < 501
    ) {
      document.documentElement.style.setProperty('--finfoLenName', 'none');
    }
    e.target.value = e.target.value.replace(/[\t\n\r]+/gm, ' ');
    if (e.key === 'Enter' || e.key === 13) {
      e.preventDefault();
    }
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight - 10 + 'px';
  }

  function clearFile() {
    setFile([]);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(currentTimeFunc());
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentTime]);

  if (!currentUser) {
    console.log('Redirect');
    return <Redirect to="/" />;
  }

  const userInfo = {
    username: currentUser.displayName,
    photo: currentUser.photoURL,
  };

  const fileTags = props.ufTags
    .filter((tag) => tag !== undefined)
    .map((tag, index) => {
      if (!tag.removed) {
        return (
          <div className={`tag-container-standard tag-container`} key={index}>
            <div className={`tag-text tag-text-standard`}>{tag.tag}</div>
            <button
              className="tag-delete btn btn-icon tag-btn"
              onClick={(e) => {
                e.preventDefault();
                tagDelete(index);
              }}
            ></button>
          </div>
        );
      }
      return [];
    });

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
    fileTags,
  };

  const functions = {
    clearFile,
    textareaAction,
    tagKeyDown,
    tagKeyUp,
  };
  return <UploadFile vars={vars} functions={functions} />;
}

const mapStateToProps = (state) => {
  return {
    ufTags: state.uploadFileReducer.uf_tags,
  };
};

const mapDispatchToProps = {
  ufTagParse,
  ufTagDelete,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadFileContainer);
