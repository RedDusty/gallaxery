import React from 'react';

const CardUploader = ({
  getRootProps,
  getInputProps,
  open,
  fileInfo,
  clearCard,
}) => {
  if (fileInfo.fileCode !== 'return') {
    return (
      <div className="prew-cards">
        <div className="uploader-container" {...getRootProps()}>
          <div className="uploader-inner">
            <input className="uploader-input" {...getInputProps()} />
            <p>Drag 'n' drop files here or click "Upload" to choose</p>
            <p>The file must be 5 MB or less.</p>
            <button
              type="button"
              onClick={open}
              className="btn uploader-inner-btn btn blinkBackgroundBorder"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (fileInfo.fileType.slice(0, 5) === 'image') {
    return (
      <div className="prew-cards">
        <div className="card-img">
          <img src={fileInfo.fileURL} alt={fileInfo.fileURL} />
          <button
            className="card-action-del blinkBorder"
            onClick={() => {
              clearCard();
            }}
          >
            <div className="card-action-del-icon" />
          </button>
        </div>
      </div>
    );
  } else if (fileInfo.fileType.slice(0, 5) === 'video') {
    return (
      <div className="prew-cards">
        <div className="card-img">
          <video src={fileInfo.source} controls>
            Your browser does not support the video tag.
          </video>
          <button
            className="card-action-del"
            onClick={() => {
              clearCard();
            }}
          ></button>
        </div>
      </div>
    );
  }
};

export default CardUploader;
