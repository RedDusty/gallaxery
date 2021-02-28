import firebase from 'firebase/app';
import 'firebase/auth';
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: 'AIzaSyDp8yXqLXhG2LjAyPkb18hbKRa98gq14jo',
  authDomain: 'gallaxery-e6cf4.firebaseapp.com',
  projectId: 'gallaxery-e6cf4',
  storageBucket: 'gallaxery-e6cf4.appspot.com',
  messagingSenderId: '338223913035',
  appId: '1:338223913035:web:a76ecef5c3d66bdf0695ce',
  measurementId: 'G-GFH7XM6GKX',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then(() => {
      console.log('Logged in with Goggle');
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const logOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log('Logged out from Google');
    })
    .catch((error) => {
      console.log(error.message);
    });
};
