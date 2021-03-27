import {
  UC_TAG_PARSE,
  UC_TAG_KEYUP,
  UC_TAG_DELETE,
  UC_FILEUPLOAD,
  UC_FILEIMAGEDLETE,
  UC_TEXTAREA,
} from '../types';

export const ucTagParse = (e) => ({
  type: UC_TAG_PARSE,
  payload: {
    e,
  },
});

export const ucTagKeyUp = (e) => ({
  type: UC_TAG_KEYUP,
  payload: {
    e,
  },
});

export const ucTagDelete = (tagId) => ({
  type: UC_TAG_DELETE,
  payload: {
    tagId,
  },
});

export const ucFileUpload = (file) => (dispatch) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    Object.assign(file, {
      source: reader.result,
    });
    dispatch({
      type: UC_FILEUPLOAD,
      payload: { file },
    });
  };
  reader.readAsDataURL(file);
};

export const ucFileImageDelete = () => ({
  type: UC_FILEIMAGEDLETE,
});

export const ucTextArea = (textarea, areaAction) => ({
  type: UC_TEXTAREA,
  payload: {
    textarea,
    areaAction,
  },
});
