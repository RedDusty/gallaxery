import React from 'react';
import delSvg from '../../../images/uploadCard/cardUploadDel.svg';

const Comment = ({ comment, currentUser, commentDelete }) => {
  let delBtn = <></>;
  if (currentUser === comment.uid && comment.uid !== undefined) {
    delBtn = (
      <button
        className="btn-img-core btn-img-fill cc-c-i-del"
        onClick={() => {
          commentDelete(comment);
        }}
      >
        <img
          src={delSvg}
          alt="Delete"
          data-btn="btn-icon"
          title="Delete comment"
        />
      </button>
    );
  }
  return (
    <div className="cc-c br15">
      <div className="cc-c-i">
        <div className="cc-c-i-u">
          <div className="cc-c-i-img">
            <img
              src={comment.infoPhotoURL}
              alt={comment.infoUsername}
              className="br100"
            />
          </div>
          <div className="cc-c-i-user">
            <p className="fS18">{comment.infoUsername + ' #' + comment.id}</p>
            <p className="cc-c-i-user-date">
              {new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'short',
                timeStyle: 'medium',
              })
                .format(new Date(comment.infoDate))
                .replace(/\//g, '.')}
            </p>
          </div>
        </div>
        {delBtn}
      </div>
      <div className="cc-c-comment">
        <p className="fS16">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
