import React from 'react';

const UploadImage = (props) => {
  const onFileChange = props.functions.onFileChange;
  const renderImages = props.functions.renderImages;
  const files = props.vars.files;

  return (
    <section className="iu">
      <div className="prew-container">
        <div className="prew-images">
          <div className="prew-images-main"></div>
          <div className="prew-images-slider">{renderImages(files)}</div>
        </div>
        <form className="prew-info">
          <div className="prew-actions">
            <label className="prew-actions-labelupl btn">
              <span>Drag and drop files here or click here to choose</span>
              <input
                type="file"
                onChange={onFileChange}
                className="prew-actions-btnupl"
              />
            </label>
            <input type="text" name="username" placeholder="NAME" />
            <button>Submit</button>
          </div>
          <div className="prew-header">
            <div className="prew-info-name"></div>
            <div className="-prew-info-sub">
              <div className="prew-info-sub-author-icon"></div>
              <div className="prew-info-sub-author-nickname"></div>
              <div className="prew-info-sub-author-time"></div>
            </div>
          </div>
          <div className="prew-info-comment"></div>
          <div className="prew-info-links"></div>
          <div className="prew-tags"></div>
        </form>
      </div>
    </section>
  );
};

export default UploadImage;
