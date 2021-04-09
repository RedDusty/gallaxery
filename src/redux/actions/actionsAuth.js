import { FB_AUTH_LOGIN } from '../types';
import firebase from 'firebase/app';
import 'firebase/firestore';

// getUserInfo after loadin page
export const firebaseAuth = (user) => {
  return async (dispatch) => {
    // get user data (old)
    const getUserStoredInfo = await firebase
      .firestore()
      .collection('users')
      .doc(user.uid);

    if ((await getUserStoredInfo.get()).exists) {
      const updateUser = await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
    } else {
      const setUser = await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          banned: false,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          cardId: [],
        });
    }

    // end getting user data
    const currentUser = { ...user };
    Object.assign(currentUser, {
      banned: (await getUserStoredInfo.get()).data().banned,
    });
    dispatch({
      type: FB_AUTH_LOGIN,
      payload: { user: currentUser },
    });
  };
};
