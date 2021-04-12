import React from 'react';
import CardInfo from './CardInfo';
import CardUploader from './CardUploader';
import Loading from '../Loading';

const UploadCard = (props) => {
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

  let uploadSvg = <></>;

  if (props.vars.isUploading === true) {
    uploadSvg = <Loading />;
  }

  return (
    <form className="uc fcj" onSubmit={props.functions.onSubmit}>
      {uploadSvg}
      <div className="ucp-actions bgLightAlt fa br25">
        <input
          className="input-fill brd uc-input-tags bgLight br25 fS16"
          placeholder="Add tags to find this..."
          onChange={props.functions.tagKeyDown}
          onKeyUp={props.functions.tagKeyUp}
          minLength="1"
          maxLength="24"
        ></input>
        <button className="btn-core btn-fill fS16 fW600">Create</button>
      </div>
      <div className="ucp-container bgLightAlt br25">
        <div className="ucp-container-border br25 fa">
          <CardUploader
            getRootProps={props.vars.getRootProps}
            getInputProps={props.vars.getInputProps}
            open={props.vars.open}
            fileInfo={fileInfo}
            clearCard={props.functions.clearCard}
          />
          <CardInfo
            userInfo={props.vars.userInfo}
            cardTags={props.vars.cardTags}
            textareaAction={props.functions.textareaAction}
          />
        </div>
      </div>
    </form>
  );
};

export default UploadCard;
