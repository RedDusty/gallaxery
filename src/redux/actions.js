import {
  HDR_TAG_PARSE_ONKEYDOWN,
  HDR_TAG_PARSE_ONKEYUP,
  MS_TAG_SEARCH_DELETE,
  MS_TAG_SEARCH_REMOVE,
  MS_TAG_SEARCH_ADD,
  GLR_CARD_LOAD,
  UF_TAG_PARSE,
  UF_TAG_KEYUP,
  UF_TAG_DELETE,
  UF_TEXTAREA,
  UF_FILEUPLOAD,
  UF_FILEIMAGEDLETE,
} from './types';

export const tagParserOnKeyDown = (e = {}, action = '') => ({
  type: HDR_TAG_PARSE_ONKEYDOWN,
  payload: {
    e,
    action,
  },
});

export const tagParserOnKeyUp = (e = {}, clearAction = 'none') => ({
  type: HDR_TAG_PARSE_ONKEYUP,
  payload: {
    e: e,
    clearAction: clearAction,
  },
});

export const tagSearchDelete = (tagId) => ({
  type: MS_TAG_SEARCH_DELETE,
  payload: {
    tagId: tagId,
  },
});

export const tagSearchRemove = (tagId) => ({
  type: MS_TAG_SEARCH_REMOVE,
  payload: {
    tagId: tagId,
  },
});

export const tagSearchAdd = (tagId) => ({
  type: MS_TAG_SEARCH_ADD,
  payload: {
    tagId: tagId,
  },
});

export const blocksConfirmedLoading = (blockId) => ({
  type: GLR_CARD_LOAD,
  payload: {
    blockId: blockId,
  },
});

export const ufTagParse = (e) => ({
  type: UF_TAG_PARSE,
  payload: {
    e,
  },
});

export const ufTagKeyUp = (e) => ({
  type: UF_TAG_KEYUP,
  payload: {
    e,
  },
});

export const ufTagDelete = (tagId) => ({
  type: UF_TAG_DELETE,
  payload: {
    tagId,
  },
});

export const ufFileUpload = (file) => (dispatch) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    Object.assign(file, {
      source: reader.result,
    });
    dispatch({
      type: UF_FILEUPLOAD,
      payload: { file },
    });
  };
  reader.readAsDataURL(file);
};

export const ufFileImageDelete = () => ({
  type: UF_FILEIMAGEDLETE,
});

export const ufTextArea = (textarea, areaAction) => ({
  type: UF_TEXTAREA,
  payload: {
    textarea,
    areaAction,
  },
});
