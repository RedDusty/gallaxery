import {
  PR_USER_CARDS,
  PR_USER_INFO,
  PR_CARDS_LOAD,
  PR_CARDS_NEWLOAD,
} from '../types';

const initialState = {
  userInfo: {
    displayName: 'Loading username...',
    photoURLAlt: 'Loading photo...',
    photoURL: 'Loading photo...',
    uid: '',
    cardId: 0,
  },
  userCards: [],
  lastId: 0,
  isLoadingCards: true,
  endLoadData: false,
};

export default function uploadCardReducer(state = initialState, action) {
  switch (action.type) {
    case PR_USER_INFO: {
      const profile = action.payload.profile;
      const userState = {
        displayName: profile.displayName,
        photoURLAlt: profile.photoURLAlt,
        photoURL: profile.photoURL,
        uid: profile.uid,
        cardId: profile.cardId,
      };
      return { ...state, userInfo: userState };
    }
    case PR_USER_CARDS: {
      const currentCards = action.payload.currentCards;
      const cards = action.payload.cards;
      const lastId = action.payload.lastId + 1;
      const outOfBounds = action.payload.outOfBounds;
      const newState = {
        userCards: currentCards.concat(cards),
        lastId: lastId,
        endLoadData: outOfBounds,
        isLoadingCards: false,
      };
      return { ...state, ...newState };
    }
    case PR_CARDS_LOAD: {
      return { ...state, ...{ isLoadingCards: true } };
    }
    case PR_CARDS_NEWLOAD: {
      return { ...state, ...initialState };
    }
    default:
      return { ...state };
  }
}
