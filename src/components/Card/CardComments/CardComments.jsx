import React from 'react';
import Comment from './Comment';
import CommentCreator from './CommentCreator';
import galIcon from '../../../images/favicon.svg';

const CardComments = (props) => {
  let commentsSection = <></>;
  let sendSection = <></>;
  if (
    props.vars.commentsInfo.endCommentsLoadData &&
    props.vars.comments.length === 0
  ) {
    commentsSection = (
      <Comment
        comment={{
          infoPhotoURL: galIcon,
          infoUsername: 'Gallaxery',
          id: 1,
          infoDate: Date.now(),
          comment:
            'I propose a deal: you write a comment here, and I will delete mine. Thus, yours will be the first. ^_^',
        }}
      />
    );
  } else {
    commentsSection = <></>;
  }
  if (props.vars.currentUser.uid !== '') {
    sendSection = (
      <CommentCreator
        refs={{
          symbolCountRef: props.vars.symbolCountRef,
          textareaRef: props.vars.textareaRef,
          textareaContRef: props.vars.textareaContRef,
        }}
        commentSend={props.functions.commentSend}
        textareaAction={props.functions.textareaAction}
        isLoading={props.vars.commentsInfo.isLoadingCardComments}
      />
    );
  }
  return (
    <div className="cc">
      <button
        className="btn-core btn-fill btn-big cc-switch"
        onClick={() => {
          props.functions.setIsComments(false);
        }}
      >
        Switch to card info
      </button>
      <div className="cc-fill bgHighAlt" ref={props.vars.crFill}>
        <div className="cc-section-comments">
          {props.functions.checker()}
          {commentsSection}
          {props.vars.comments}
        </div>
        {sendSection}
      </div>
    </div>
  );
};

export default CardComments;
