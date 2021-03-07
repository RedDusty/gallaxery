import React from 'react';

const FileInfo = ({
  inputName,
  userInfo,
  currentTime,
  textareaKeyDown,
  textareaKeyUp,
  textareaPaste,
}) => {
  return (
    <form className="prew-info">
      <div className="finfo-header">
        <textarea
          className="finfo-name finfo-textarea"
          placeholder="Write name here..."
          ref={inputName}
          minLength="1"
          maxLength="100"
          spellCheck="false"
          required={true}
          onKeyPress={textareaKeyDown}
          onKeyUp={textareaKeyUp}
          onPaste={textareaPaste}
        ></textarea>
      </div>
      <textarea
        className="finfo-comment finfo-textarea"
        placeholder="Write some comments here..."
        maxLength="500"
        spellCheck="false"
        onKeyPress={textareaKeyDown}
        onKeyUp={textareaKeyUp}
        onPaste={textareaPaste}
      ></textarea>
      <textarea
        className="finfo-tags finfo-textarea"
        placeholder="Add tags here to find this..."
        onKeyPress={textareaKeyDown}
        onKeyUp={textareaKeyUp}
        onPaste={textareaPaste}
      ></textarea>
      <div className="finfo-sub">
        <div className="finfo-sub-author">
          <img className="finfo-sub-author-icon" src={userInfo.photo}></img>
          <div className="finfo-sub-author-username">{userInfo.username}</div>
        </div>
        <p className="finfo-sub-time">{currentTime}</p>
      </div>
    </form>
  );
};
export default FileInfo;
