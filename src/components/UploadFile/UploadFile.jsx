import React from 'react';
import FileInfo from './FileInfo';
import FileUploader from './FileUploader';

const UploadFile = (props) => {
  const getRootProps = props.vars.getRootProps;
  const getInputProps = props.vars.getInputProps;
  const open = props.vars.open;
  const inputName = props.vars.inputName;
  const userInfo = props.vars.userInfo;
  const clearFile = props.functions.clearFile;
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
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            open={open}
            fileInfo={fileInfo}
            clearFile={clearFile}
          />
          <FileInfo inputName={inputName} userInfo={userInfo} />
        </div>
      </div>
    </section>
  );
};

export default UploadFile;
