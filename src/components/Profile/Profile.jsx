import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Context from '../../context';

const Profile = (props) => {
  const [redirect, setRedirect] = useState(null);
  const user = useContext(Context);

  useEffect(() => {
    if (!user) {
      setRedirect('/');
    }
  }, [user]);

  if (redirect) {
    <Redirect to={redirect} />;
  }
  const userName = props.vars.userName;
  const photoURLAlt = props.vars.photoURLAlt;
  const photoURL = props.vars.photoURL;
  const firstLogin = props.vars.firstLogin;
  const lastLogin = props.vars.lastLogin;
  return (
    <div className="Profile">
      <div className="profile-actions">
        <NavLink className="btn btn-link" to="/">
          Back
        </NavLink>
      </div>
      <div className="info">
        <div>
          <img src={photoURL} alt={photoURLAlt} />
        </div>
        <div>{userName}</div>
        <div>{firstLogin}</div>
        <div>{lastLogin}</div>
      </div>
      <div className="images"></div>
    </div>
  );
};

export default Profile;
