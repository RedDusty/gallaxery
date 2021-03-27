import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';

import './App.scss';
import GalleryContainer from './components/Gallery/GalleryContainer';
import CardContainer from './components/Card/CardContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import UploadCardContainer from './components/UploadCard/UploadCardContainer';
import NotFound from './components/NotFound';

import { firebaseAuth } from './redux/actions/actionsAuth';

function App(props) {
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
        <Route component={UploadCardContainer} exact path="/card-upload" />
        <Route component={CardContainer} exact path="/card/:id" />
        <Route component={GalleryContainer} exact path="/card/:id" />
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer,
  };
};

const mapDispatchToProps = {
  firebaseAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
