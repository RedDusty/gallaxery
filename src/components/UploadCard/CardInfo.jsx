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

const CardInfo = ({ userInfo, textareaAction, cardTags }) => {
  const [currentTime, setCurrentTime] = useState(currentTimeFunc());
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTime(currentTimeFunc());
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentTime]);
  return (
    <div className="prew-info">
      <div className="cinfo-header">
        <textarea
          className="cinfo-name cinfo-textarea blinkBorder"
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
        <p className="cinfo-length-name cinfo-length">
          Maximum 250 characters!
        </p>
      </div>
      <textarea
        className="cinfo-comment cinfo-textarea blinkBorder"
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
      <p className="cinfo-length-comment cinfo-length">
        Maximum 750 characters!
      </p>
      <div className="cinfo-sub">
        <NavLink
          to="/card-upload"
          className="cinfo-sub-author blinkBackgroundBorder"
        >
          <img className="cinfo-sub-author-icon" src={userInfo.photo}></img>
          <div className="cinfo-sub-author-username">{userInfo.username}</div>
        </NavLink>
        <p className="cinfo-sub-time">{currentTime}</p>
      </div>
      <div className="cinfo-tags-container">{cardTags}</div>
      <p className="cinfo-length-tags cinfo-length">
        There should be 2-25 tags.
      </p>
    </div>
  );
};
export default CardInfo;
