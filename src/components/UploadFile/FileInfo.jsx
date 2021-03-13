import React from 'react';

const FileInfo = ({
  inputName,
  userInfo,
  currentTime,
  textareaAction,
  fileTags,
}) => {
  return (
    <form className="prew-info">
      <div className="finfo-header">
        <textarea
          className="finfo-name finfo-textarea"
          placeholder="Write name here..."
          ref={inputName}
          spellCheck="false"
          onKeyPress={textareaAction}
          onKeyUp={textareaAction}
          onPaste={textareaAction}
        ></textarea>
        <p className="finfo-length-name finfo-length">
          Maximum 250 characters!
        </p>
      </div>
      <textarea
        className="finfo-comment finfo-textarea"
        placeholder="Write some comments here..."
        spellCheck="false"
        onKeyPress={textareaAction}
        onKeyUp={textareaAction}
        onPaste={textareaAction}
      ></textarea>
      <p className="finfo-length-comment finfo-length">
        Maximum 750 characters!
      </p>
      <div className="finfo-sub">
        <div className="finfo-sub-author">
          <img className="finfo-sub-author-icon" src={userInfo.photo}></img>
          <div className="finfo-sub-author-username">{userInfo.username}</div>
        </div>
        <p className="finfo-sub-time">{currentTime}</p>
      </div>
      <div className="finfo-tags-container">{fileTags}</div>
      <p className="finfo-length-tags finfo-length">
        There should be 4-25 tags.
      </p>
    </form>
  );
};
export default FileInfo;
