import React from 'react';

const FileInfo = ({ inputName, userInfo, currentTime }) => {
  return (
    <form className="prew-info">
      <div className="finfo-header">
        <input
          className="finfo-name"
          type="text"
          placeholder="Write name..."
          ref={inputName}
        />
        <div className="finfo-sub">
          <div className="finfo-sub-author-icon">{userInfo.photo}</div>
          <div className="finfo-sub-author-nickname">{userInfo.username}</div>
          <div className="finfo-sub-author-time">{currentTime}</div>
        </div>
      </div>
      <div className="finfo-comment"></div>
      <div className="finfo-links"></div>
      <div className="finfo-tags"></div>
    </form>
  );
};
export default FileInfo;
