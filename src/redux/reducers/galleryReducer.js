import { GLR_CARD_LOAD, GLR_GET_CARDS } from '../types';

const initialState = {
  cards: [],
  lastKey: '',
  isLoadingCards: true,
};

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case GLR_GET_CARDS: {
      const currentCards = action.payload.currentCards;
      const cards = action.payload.cards;
      const lastKey = action.payload.lastKey;
      const newState = {
        cards: currentCards.concat(cards),
        lastKey: lastKey,
        isLoadingCards: false,
      };
      return { ...state, ...newState };
    }
    case GLR_CARD_LOAD: {
      return { ...state, ...{ isLoadingCards: true } };
    }
    default: {
      return { ...state };
    }
  }
}
