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
        There should be 2-25 tags. Max tag characters - 24.
      </p>
      <div className="uc-a-likes">
        <button className="uc-a-likes-img" tabIndex="21" title="Add like">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ffc7e3"
              d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
            />
            <path
              fill="#ff6392"
              d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"
            />
          </svg>
        </button>
        <p className="uc-a-likes-count">0</p>
      </div>
    </div>
  );
};
export default CardInfo;
