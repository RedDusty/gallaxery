import React from 'react';
import FileInfo from './FileInfo';
import FileUploader from './FileUploader';

const UploadFile = (props) => {
  let fileInfo = {};
  try {
    fileInfo = props.vars.fileInfo[0];
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

  return (
    <section className="iu">
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
            inputName={props.vars.inputName}
            userInfo={props.vars.userInfo}
            currentTime={props.vars.currentTime}
            textareaKeyUp={props.functions.textareaKeyUp}
            textareaKeyDown={props.functions.textareaKeyDown}
            textareaPaste={props.functions.textareaPaste}
          />
        </div>
      </div>
      <div className="prew-actions">
        <button className="prew-actions-done btn">Done</button>
      </div>
    </section>
  );
};

export default UploadFile;
