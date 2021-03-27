import { FB_AUTH_LOGIN } from '../types';

const initialState = {
  banned: false,
  displayName: 'Loading...',
  photoURL: 'Loading...',
  uid: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FB_AUTH_LOGIN: {
      if (action.payload.user !== null) {
        const newState = {
          banned: action.payload.user.banned,
          displayName: action.payload.user.displayName,
          photoURL: action.payload.user.photoURL,
          uid: action.payload.user.uid,
        };
        return {
          ...state,
          ...newState,
        };
      }
      return {
        ...state,
      };
    }

    default: {
      return { ...state };
    }
  }
}
