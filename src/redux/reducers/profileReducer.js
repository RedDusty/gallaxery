import { PR_USER_CARDS, PR_USER_INFO, PR_CARDS_LOAD } from '../types';

const initialState = {
  userInfo: {
    displayName: 'Loading username...',
    photoURLAlt: 'Loading photo...',
    photoURL: 'Loading photo...',
    uid: '',
  },
  userCards: [],
  lastKey: 0,
  isLoadingCards: true,
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
      };
      return { ...state, userInfo: userState };
    }
    case PR_USER_CARDS: {
      const cards = action.payload.cards;
      const lastKey = action.payload.lastKey;
      const newState = {
        userCards: cards,
        lastKey: lastKey,
      };
      return { ...state, ...newState, ...{ isLoadingCards: false } };
    }
    case PR_CARDS_LOAD: {
      return { ...state, ...{ isLoadingCards: true } };
    }
    default:
      return { ...state };
  }
}
