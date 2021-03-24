import React from 'react';
import FileInfo from './FileInfo';
import FileUploader from './FileUploader';

const UploadFile = (props) => {
  let fileInfo = {};
  try {
    fileInfo = props.vars.fileInfo;
    if (!fileInfo) {
      fileInfo = {
        name: '',
        source: '',
        code: '',
        type: '',
      };
    }
  } catch (error) {
    fileInfo = {
      name: 'Error loading name...',
      source: 'Error loading file...',
      code: 'error',
    };
  }

  let uploadBtn = (
    <>
      <input
        className="prew-actions-tags blinkBorder"
        placeholder="Add tags to find this..."
        onChange={props.functions.tagKeyDown}
        onKeyUp={props.functions.tagKeyUp}
        minLength="1"
        maxLength="15"
      ></input>
      <button className="prew-actions-done btn blinkBackgroundBorder">
        Create
      </button>
    </>
  );

  if (props.vars.isUploading === true) {
    uploadBtn = (
      <div className="loading">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <form className="iu" onSubmit={props.functions.onSubmit}>
      <div className="prew-actions">{uploadBtn}</div>
      <div className="prew-container">
        <div className="prew-container-border">
          <FileUploader
            getRootProps={props.vars.getRootProps}
            getInputProps={props.vars.getInputProps}
            open={props.vars.open}
            fileInfo={fileInfo}
            clearFile={props.functions.clearFile}
          />
          <FileInfo
            userInfo={props.vars.userInfo}
            fileTags={props.vars.fileTags}
            textareaAction={props.functions.textareaAction}
          />
        </div>
      </div>
    </form>
  );
};

export default UploadFile;
