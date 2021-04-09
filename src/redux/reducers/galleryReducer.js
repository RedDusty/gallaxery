import { GLR_CARD_LOAD, GLR_GET_CARDS, GLR_CARD_NEWLOAD } from '../types';

const initialState = {
  cards: [],
  lastKey: '',
  isLoadingCards: true,
  endLoadData: false,
};

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case GLR_GET_CARDS: {
      const currentCards = action.payload.currentCards;
      const cards = action.payload.cards;
      const lastKey = action.payload.lastKey;
      const endLoadData = action.payload.endLoadData;
      const newState = {
        cards: currentCards.concat(cards),
        lastKey: lastKey,
        isLoadingCards: false,
        endLoadData: endLoadData,
      };
      return { ...state, ...newState };
    }
    case GLR_CARD_LOAD: {
      return { ...state, ...{ isLoadingCards: true } };
    }
    case GLR_CARD_NEWLOAD: {
      return { ...state, ...initialState };
    }
    default: {
      return { ...state };
    }
  }
}
