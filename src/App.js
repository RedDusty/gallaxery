import { Route, Switch } from 'react-router-dom';
import './App.scss';
import GalleryContainer from './components/Gallery/GalleryContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import UploadFileContainer from './components/UploadFile/UploadFileContainer';
import NotFound from './components/NotFound';

import firebase from 'firebase/app';
import 'firebase/auth';
import CardContainer from './components/Card/CardContainer';

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();

  const authWithGoogle = () => {
    firebase.auth().signInWithRedirect(provider);
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
        <Route component={ProfileContainer} exact path="/profile/:uid" />
        <Route component={UploadFileContainer} exact path="/file-upload" />
        <Route component={CardContainer} exact path="/card/:id" />
        <Route component={GalleryContainer} exact path="/card/:id" />
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
