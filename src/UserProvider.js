import React, { useEffect, useState } from 'react';
import Context from './context';
import { auth } from './firebase';

export default (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (userFb) => {
      try {
        const displayName = userFb.displayName;
        const photoURL = userFb.photoURL;
        const firstLogin = userFb.metadata.creationTime;
        const lastLogin = userFb.metadata.lastSignInTime;
        setUser({
          displayName,
          photoURL,
          firstLogin,
          lastLogin,
        });
      } catch (error) {}
    });
  }, []);

  return <Context.Provider value={{ user }}>{props.children}</Context.Provider>;
};
