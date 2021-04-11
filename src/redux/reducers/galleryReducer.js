import {
  GLR_CARD_LOAD,
  GLR_GET_CARDS,
  GLR_CARD_NEWLOAD,
  GLR_SEARCH_CARDS,
  GLR_SEARCH_SET,
} from '../types';

const initialState = {
  cards: [],
  searchedCards: [],
  lastKey: '',
  isLoadingCards: true,
  endLoadData: false,
  isSearch: false,
};

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case GLR_GET_CARDS: {
      const currentCards = action.payload.currentCards;
      const cards = action.payload.cards;
      const lastKey = action.payload.lastKey;
      const endLoadData = action.payload.endLoadData;
      let concatedCards =
        currentCards !== undefined ? currentCards.concat(cards) : cards;
      const newState = {
        cards: concatedCards,
        lastKey: lastKey,
        isLoadingCards: true,
        endLoadData: endLoadData,
      };
      return { ...state, ...newState };
    }
    case GLR_CARD_LOAD: {
      const isLoad =
        action.payload === undefined ? true : action.payload.isLoad;
      return { ...state, ...{ isLoadingCards: isLoad } };
    }
    case GLR_CARD_NEWLOAD: {
      return {
        ...state,
        cards: [],
        searchedCards: [],
        lastKey: '',
        isLoadingCards: false,
        endLoadData: false,
      };
    }
    case GLR_SEARCH_CARDS: {
      return {
        ...state,
        ...{ searchedCards: action.payload.queryResult },
      };
    }
    case GLR_SEARCH_SET: {
      return {
        ...state,
        ...{ isSearch: action.payload.isSearch },
      };
    }
    default: {
      return { ...state };
    }
  }
}
