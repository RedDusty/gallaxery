import React, { useEffect, useState } from 'react';
import { firebaseConfig } from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

async function addUserToDB(user) {
  const firestore = await firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({
      banned: false,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
    });
}

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        addUserToDB(user);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
