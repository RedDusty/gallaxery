import {
  TAG_SEARCH_DELETE,
  TAG_PARSE_ONKEYDOWN,
  TAG_PARSE_ONKEYUP,
  TAG_SEARCH_REMOVE,
  TAG_SEARCH_ADD,
  BLOCKS_CONFIRMED_LOADING,
  UF_TAG_PARSE,
  UF_TAG_DELETE,
  HEADER_TAGS_UPDATER,
} from './types';

export const tagParserOnKeyDown = (e = {}, action = '') => ({
  type: TAG_PARSE_ONKEYDOWN,
  payload: {
    e,
    action,
  },
});

export const tagParserOnKeyUp = (e = {}, clearAction = 'none') => ({
  type: TAG_PARSE_ONKEYUP,
  payload: {
    e: e,
    clearAction: clearAction,
  },
});

export const tagSearchDelete = (tagId) => ({
  type: TAG_SEARCH_DELETE,
  payload: {
    tagId: tagId,
  },
});

export const tagSearchRemove = (tagId) => ({
  type: TAG_SEARCH_REMOVE,
  payload: {
    tagId: tagId,
  },
});

export const tagSearchAdd = (tagId) => ({
  type: TAG_SEARCH_ADD,
  payload: {
    tagId: tagId,
  },
});

export const headerTagsUpdater = () => ({
  type: HEADER_TAGS_UPDATER,
});

export const blocksConfirmedLoading = (blockId) => ({
  type: BLOCKS_CONFIRMED_LOADING,
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

export const ufTagDelete = (tagId) => ({
  type: UF_TAG_DELETE,
  payload: {
    tagId,
  },
});
