import React from 'react';
import delIcon from '../../images/uploadCard/cardUploadDel.svg';

const CardUploader = ({
  getRootProps,
  getInputProps,
  open,
  fileInfo,
  clearCard,
}) => {
  if (fileInfo.fileCode !== 'return') {
    return (
      <div className="ucpc">
        <div className="ucpc-container bgHigh fja br25" {...getRootProps()}>
          <div className="ucpc-inner fcj br25 fW500">
            <input className="ucpc-input" {...getInputProps()} />
            <p>Drag 'n' drop files here or click "Upload" to choose</p>
            <p>The file must be 16 MB or less.</p>
            <button
              type="button"
              onClick={open}
              className="btn-core btn-fill fS16 fW600"
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
      <div className="ucpc">
        <div className="ucpc-img">
          <img
            src={fileInfo.fileURL}
            alt={fileInfo.fileURL}
            data-btn="ucp-img"
          />
          <button
            className="ucpc-img-del btn-img-core btn-img-fill br25 bgLight"
            onClick={() => {
              clearCard();
            }}
          >
            <img src={delIcon} alt="❌" data-btn="btn-icon" />
          </button>
        </div>
      </div>
    );
  }
};

export default CardUploader;
