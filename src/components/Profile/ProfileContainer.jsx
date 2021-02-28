import React, { useState, useContext, useEffect } from 'react';
import Profile from './Profile';
import './profile.scss';

import Context from '../../context';
import { Redirect } from 'react-router-dom';

function ProfileContainer() {
  const [redirect, setRedirect] = useState(null);
  const { user } = useContext(Context);

  useEffect(() => {
    if (!user) {
      console.log('Redirect');
      setRedirect('/');
    }
  }, [user]);

  if (redirect) {
    return <Redirect to="/" />;
  }

  let userName = 'Loading username...';
  let photoURLAlt = 'Loading photo...';
  let photoURL = '';
  let firstLogin = 'Loading first login...';
  let lastLogin = 'Loading last login...';
  try {
    userName = user.displayName;
    photoURL = user.photoURL;
    firstLogin = user.firstLogin;
    lastLogin = user.lastLogin;
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
