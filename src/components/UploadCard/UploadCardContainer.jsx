import React, { useContext, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadCard from './UploadCard';
import './uploadCard.scss';

import { Redirect } from 'react-router';
import { UserContext } from '../../UserProvider';
import {
  ucFileUpload,
  ucTagDelete,
  ucTagParse,
  ucTagKeyUp,
  ucFileImageDelete,
  ucTextArea,
  ucCreateCard,
} from '../../redux/actions/actionsUploadCard';
import { connect } from 'react-redux';

import tagDelIcon from '../../images/search/tagDelete.svg';

// CARD COLOR
// MINI-ALUBM (10 CARDS IN ONE CARD MAX)

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
        <div
          className={`tag-container-standard tag-container fa br25`}
          key={index}
        >
          <p className={`tag-text tag-text-standard fW500`}>{tag.tag}</p>
          <button
            className="btn-img-core btn-img-fill"
            onClick={(e) => {
              e.preventDefault();
              tagDelete(index);
            }}
          >
            <img src={tagDelIcon} data-alt="✖" data-btn="btn-icon" />
          </button>
        </div>
      );
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      fileInfo.fileCode.length !== 0 &&
      props.ucTags.length > 1 &&
      props.ucTags.length < 26
    ) {
      if (!isUploading) {
        setIsUploading(true);
        const data = {
          fileInfo: fileInfo,
          ucTags: props.ucTags,
          ucCard: props.ucCard,
          userInfo: userInfo,
        };
        props.ucCreateCard(data, props.history);
      }
    } else {
      setIsUploading(false);
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
  ucCreateCard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadCardContainer);
