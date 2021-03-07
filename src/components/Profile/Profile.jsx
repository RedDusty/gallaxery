import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { UserContext } from '../../UserProvider';

const Profile = (props) => {
  const [redirect, setRedirect] = useState(null);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) {
      setRedirect('/');
    }
  }, [currentUser]);

  if (redirect) {
    <Redirect to={redirect} />;
  }
  const userName = props.vars.userName;
  const photoURLAlt = props.vars.photoURLAlt;
  const photoURL = props.vars.photoURL;
  const firstLogin = props.vars.firstLogin;
  const lastLogin = props.vars.lastLogin;
  return (
    <div className="p">
      <div className="p-info">
        <div className="p-info-left">
          <div className="p-info-photo">
            <img src={photoURL} alt={photoURLAlt} />
          </div>
        </div>
        <div className="p-info-right">
          <div className="p-info-username">{userName}</div>
        </div>
      </div>
      <div className="p-actions">
        <NavLink className="btn btn-link" to="#" tabIndex="42">
          Change user
        </NavLink>
      </div>
      <div className="images"></div>
    </div>
  );
};

export default Profile;
