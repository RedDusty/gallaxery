import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import { firebaseAuth } from './redux/actions/actionsAuth';
import 'firebase/auth';

import './App.scss';
import HeaderContainer from './components/Header/HeaderContainer';
import Loading from './components/Loading';
const NotFound = lazy(() => import('./components/NotFound'));
const UploadCardContainer = lazy(() =>
  import('./components/UploadCard/UploadCardContainer')
);
const ProfileContainer = lazy(() =>
  import('./components/Profile/ProfileContainer')
);
const CardContainer = lazy(() => import('./components/Card/CardContainer'));
const GalleryContainer = lazy(() =>
  import('./components/Gallery/GalleryContainer')
);

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
        console.log('Oops! Something is went wrong!');
      });
  };

  return (
    <div className="fcj">
      <HeaderContainer authWithGoogle={authWithGoogle} logOut={logOut} />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route component={GalleryContainer} exact path="/" />
          <Route
            render={() => {
              return (
                <ProfileContainer
                  keyUID={window.location.pathname.substring(9)}
                />
              );
            }}
            exact
            path="/profile/:uid"
          />
          <Route
            render={() => {
              return <UploadCardContainer />;
            }}
            exact
            path="/card-upload"
          />
          <Route
            render={() => {
              return <CardContainer />;
            }}
            exact
            path="/card/:id"
          />
          <Route
            render={() => {
              return <NotFound />;
            }}
          />
        </Switch>
      </Suspense>
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
