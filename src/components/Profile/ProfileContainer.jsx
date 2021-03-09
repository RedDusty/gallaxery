import React, { useState, useContext, useEffect } from 'react';
import Profile from './Profile';
import './profile.scss';

import { Redirect } from 'react-router-dom';
import { UserContext } from '../../UserProvider';

function ProfileContainer() {
  const [redirect, setRedirect] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) {
      console.log('Redirect');
      setRedirect('/');
    }
  }, [currentUser]);

  if (redirect) {
    return <Redirect to="/" />;
  }

  let userName = 'Loading username...';
  let photoURLAlt = 'Loading photo...';
  let photoURL = '';
  let firstLogin = 'Loading first login...';
  let lastLogin = 'Loading last login...';
  try {
    userName = currentUser.displayName;
    photoURL = currentUser.photoURL;
    firstLogin = currentUser.firstLogin;
    lastLogin = currentUser.lastLogin;
  } catch (error) {}

  const vars = {
    userName,
    photoURLAlt,
    photoURL,
    firstLogin,
    lastLogin,
  };

  return <Profile vars={vars} />;
}

export default ProfileContainer;
