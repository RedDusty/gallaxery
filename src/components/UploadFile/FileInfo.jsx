import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function currentTimeFunc() {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'medium',
  })
    .format(new Date(Date.now()))
    .replace(/\//g, '.');
}

const FileInfo = ({ userInfo, textareaAction, fileTags }) => {
  const [currentTime, setCurrentTime] = useState(currentTimeFunc());
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(currentTimeFunc());
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentTime]);
  return (
    <div className="prew-info">
      <div className="finfo-header">
        <textarea
          className="finfo-name finfo-textarea blinkBorder"
          placeholder="Write name here..."
          spellCheck="false"
          onChange={(e) => {
            textareaAction(e, 'name');
          }}
          onKeyUp={(e) => {
            textareaAction(e, 'name');
          }}
          onPaste={(e) => {
            textareaAction(e, 'name');
          }}
        ></textarea>
        <p className="finfo-length-name finfo-length">
          Maximum 250 characters!
        </p>
      </div>
      <textarea
        className="finfo-comment finfo-textarea blinkBorder"
        placeholder="Write some comments here..."
        spellCheck="false"
        onChange={(e) => {
          textareaAction(e, 'comment');
        }}
        onKeyUp={(e) => {
          textareaAction(e, 'comment');
        }}
        onPaste={(e) => {
          textareaAction(e, 'comment');
        }}
      ></textarea>
      <p className="finfo-length-comment finfo-length">
        Maximum 750 characters!
      </p>
      <div className="finfo-sub">
        <NavLink
          to="/file-upload"
          className="finfo-sub-author blinkBackgroundBorder"
        >
          <img className="finfo-sub-author-icon" src={userInfo.photo}></img>
          <div className="finfo-sub-author-username">{userInfo.username}</div>
        </NavLink>
        <p className="finfo-sub-time">{currentTime}</p>
      </div>
      <div className="finfo-tags-container">{fileTags}</div>
      <p className="finfo-length-tags finfo-length">
        There should be 2-25 tags.
      </p>
    </div>
  );
};
export default FileInfo;
