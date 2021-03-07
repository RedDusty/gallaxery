import { Route, Switch } from 'react-router-dom';
import './App.scss';
import GalleryContainer from './components/Gallery/GalleryContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import UploadFileContainer from './components/UploadFile/UploadFileContainer';
import NotFound from './components/NotFound';

import firebase from 'firebase';

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();

  const authWithGoogle = () => {
    firebase.auth().signInWithPopup(provider);
  };
  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Logged out from Google');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="App">
      <HeaderContainer authWithGoogle={authWithGoogle} logOut={logOut} />
      <Switch>
        <Route component={GalleryContainer} exact path="/" />
        <Route component={ProfileContainer} exact path="/profile" />
        <Route component={UploadFileContainer} exact path="/file-upload" />
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
