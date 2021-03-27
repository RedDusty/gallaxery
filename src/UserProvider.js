import React, { useEffect, useState } from 'react';
import firebaseConfig from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseAuth } from './redux/actions/actionsAuth';
import { connect } from 'react-redux';

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

const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        addUserToDB(user);
        props.firebaseAuth(user);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

const mapDispatchToProps = {
  firebaseAuth,
};

export default connect(null, mapDispatchToProps)(UserProvider);
