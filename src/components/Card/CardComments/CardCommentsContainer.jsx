import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import './cardComments.scss';
import CardComments from './CardComments';
import {
  ccTextArea,
  getCardComments,
  ccSend,
  ccDelete,
} from '../../../redux/actions/actionsCard';
import Comment from './Comment';
import loadingSvg from '../../../images/loading.svg';

function CardCommentsContainer(props) {
  const [scrollPercent, setScrollPercent] = useState(false);
  const symbolCountRef = useRef(null);
  const textareaRef = useRef(null);
  const textareaContRef = useRef(null);
  const crFill = useRef(null);

  const currentUser = props.currentUser;
  useEffect(() => {
    if (!props.commentsInfo.endCommentsLoadData) {
      let checkHeightInterval = setInterval(() => {
        const winScroll = crFill.current.scrollTop;
        const height =
          crFill.current.scrollHeight - crFill.current.clientHeight;
        const scrolled = (winScroll / height) * 100;
        setScrollPercent(scrolled.toFixed(0));
        if (
          scrollPercent <= 40 ||
          scrollPercent === 'NaN' ||
          scrollPercent === false ||
          !(document.body.scrollHeight > document.body.clientHeight)
        ) {
          if (props.commentsInfo.isLoadingCardComments) {
            props.getCardComments(
              props.commentsInfo.comments,
              props.cardId,
              props.commentsInfo.commentsLastKey
            );
          }
        }
      }, 1000);

      return () => {
        clearInterval(checkHeightInterval);
      };
    }
  });

  function commentDelete(comment) {
    if (comment.uid === props.userInfo.uid) {
      props.ccDelete(comment, props.cardId, props.comments);
    }
  }

  let commentsArray = props.comments;

  commentsArray = commentsArray.sort((a, b) => {
    return a.infoDate - b.infoDate;
  });

  const comments = props.comments.map((comment) => {
    return (
      <Comment
        comment={comment}
        key={comment.id}
        currentUser={currentUser.uid}
        commentDelete={commentDelete}
      />
    );
  });

  function textareaAction() {
    props.ccTextArea(textareaRef, textareaContRef, symbolCountRef);
  }

  function commentSend() {
    if (
      props.commentInput.length < 251 &&
      props.commentInput.length > 0 &&
      props.commentsInfo.isLoadingCardComments === true &&
      currentUser.uid !== ''
    ) {
      props.ccSend(
        props.commentInput,
        props.userInfo,
        props.cardId,
        textareaRef,
        props.commentsInfo.comments,
        symbolCountRef,
        textareaContRef
      );
    }
  }

  function checker() {
    if (
      props.commentsInfo.commentsLastKey !== 1 &&
      props.commentsInfo.endCommentsLoadData === false
    ) {
      return (
        <div className="s-loading fja">
          <img src={loadingSvg} alt="Loading" className="s-loading-svg br100" />
        </div>
      );
    } else {
      return <></>;
    }
  }

  const vars = {
    symbolCountRef,
    textareaRef,
    textareaContRef,
    crFill,
    comments,
    commentsInfo: props.commentsInfo,
    currentUser,
  };

  const functions = {
    setIsComments: props.setIsComments,
    textareaAction,
    commentSend,
    checker,
  };

  return <CardComments vars={vars} functions={functions} />;
}

const mapStateToProps = (state) => {
  return {
    comments: state.cardReducer.commentsInfo.comments,
    commentsInfo: state.cardReducer.commentsInfo,
    commentInput: state.cardReducer.commentInput,
    userInfo: state.userReducer,
    cardId: state.cardReducer.cardInfo.id,
    currentUser: state.userReducer,
  };
};

const mapDispatchToProps = {
  getCardComments,
  ccTextArea,
  ccSend,
  ccDelete,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardCommentsContainer);
