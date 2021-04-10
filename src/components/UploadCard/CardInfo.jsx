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
    <div className="ucpci">
      <div className="ucpci-header">
        <textarea
          className="ucpci-name ucpci-textarea input-fill br25 fS18 fW600 shadowDark"
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
        <p className="ucpci-error-name ucpci-error ucpci-error-show br15">
          Maximum 250 characters!
        </p>
      </div>
      <textarea
        className="ucpci-comment ucpci-textarea input-fill br25 fS18 fW500 bgLight"
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
      <p className="ucpci-error-comment ucpci-error ucpci-error-show br15">
        Maximum 750 characters!
      </p>
      <div className="ucpci-sub fcj mtop">
        <NavLink
          to="/card-upload"
          className="ucpci-sub-l btn-core btn-fill fja br25 mtop"
          title={userInfo.username + "'s profile"}
        >
          <img className="br100" src={userInfo.photo}></img>
          <p className="ucpci-sub-lu fW500">{userInfo.username}</p>
        </NavLink>
        <p className="ucpci-sub-time mtop fW500">{currentTime}</p>
      </div>
      <div className="ucpci-tags-container bgHighAlt br25">{cardTags}</div>
      <p className="ucpci-error-tags ucpci-error ucpci-error-show br15">
        There should be 2-25 tags.
      </p>
    </div>
  );
};
export default CardInfo;
