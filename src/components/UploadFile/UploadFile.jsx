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

  return (
    <section className="iu">
      <form onSubmit={props.functions.onSubmit}>
        <div className="prew-actions">
          <input
            className="prew-actions-tags"
            placeholder="Add tags to find this..."
            onKeyDown={props.functions.tagKeyDown}
            onKeyUp={props.functions.tagKeyUp}
            minLength="1"
            maxLength="15"
          ></input>
          <button className="prew-actions-done btn">Create</button>
        </div>
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
              fileInfo={fileInfo}
              inputName={props.vars.inputName}
              userInfo={props.vars.userInfo}
              currentTime={props.vars.currentTime}
              fileTags={props.vars.fileTags}
              textareaAction={props.functions.textareaAction}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default UploadFile;
