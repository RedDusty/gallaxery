import {
  HDR_TAG_PARSE_ONKEYDOWN,
  HDR_TAG_PARSE_ONKEYUP,
  MS_TAG_SEARCH_DELETE,
  GLR_SEARCH_CARDS,
  HDR_TAG_CLEANER,
  HDR_TAG_PARSE_ONBUTTON,
  HDR_TAG_PARSE_DATE,
} from '../types';

import firebase from 'firebase/app';
import 'firebase/firestore';

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

export const tagCleaner = () => ({
  type: HDR_TAG_CLEANER,
});

export const tagParseOnButton = (inputRef) => ({
  type: HDR_TAG_PARSE_ONBUTTON,
  payload: { inputRef },
});

export const tagParseDate = (inputRef) => ({
  type: HDR_TAG_PARSE_DATE,
  payload: { inputRef },
});

export const searchCards = (searchEnter, searchBy = 'byTags') => {
  return async (dispatch) => {
    let queryResult = [];
    let queryArrayByTags = [];
    searchEnter.map((el) => {
      if (el == undefined) {
        queryArrayByTags.push('');
      } else {
        queryArrayByTags.push(el);
      }
    });
    queryArrayByTags.splice(10);
    while (queryArrayByTags.length < 10) {
      queryArrayByTags.push('');
    }

    if (searchBy === 'byTags') {
      const getTagSearch = await firebase
        .firestore()
        .collection('usersImages')
        .where('infoTags', 'array-contains-any', [
          queryArrayByTags[0],
          queryArrayByTags[1],
          queryArrayByTags[2],
          queryArrayByTags[3],
          queryArrayByTags[4],
          queryArrayByTags[5],
          queryArrayByTags[6],
          queryArrayByTags[7],
          queryArrayByTags[8],
          queryArrayByTags[9],
        ])
        .get();
      getTagSearch.docs.map((doc) => {
        queryResult.push(doc.data().id);
      });
    }

    if (searchBy === 'byUsername' || searchBy === 'byDate') {
      let fieldSearch =
        searchBy === 'byUsername' ? 'infoUsername' : 'infoDateStr';
      const getUserDateSearch = await firebase
        .firestore()
        .collection('usersImages')
        .where(fieldSearch, 'in', [
          queryArrayByTags[0],
          queryArrayByTags[1],
          queryArrayByTags[2],
          queryArrayByTags[3],
          queryArrayByTags[4],
          queryArrayByTags[5],
          queryArrayByTags[6],
          queryArrayByTags[7],
          queryArrayByTags[8],
          queryArrayByTags[9],
        ])
        .get();
      getUserDateSearch.docs.map((doc) => {
        queryResult.push(doc.data().id);
      });
    }
    dispatch({ type: GLR_SEARCH_CARDS, payload: { queryResult } });
  };
};
