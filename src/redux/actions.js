import {
  TAG_SEARCH_DELETE,
  TAG_PARSE_ONKEYDOWN,
  TAG_PARSE_ONKEYUP,
  TAG_SEARCH_REMOVE,
  TAG_SEARCH_ADD,
  BLOCKS_CONFIRMED_LOADING,
} from './types';

export const tagParserOnKeyDown = (e = {}) => ({
  type: TAG_PARSE_ONKEYDOWN,
  payload: {
    e: e,
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

export const blocksConfirmedLoading = (blockId) => ({
  type: BLOCKS_CONFIRMED_LOADING,
  payload: {
    blockId: blockId,
  },
});
