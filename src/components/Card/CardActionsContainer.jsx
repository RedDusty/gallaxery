import React, { useEffect } from 'react';
import CardActions from './CardActions';

import firebase from 'firebase/app';
import { UserContext } from '../../UserProvider';

function CardActionsContainer(props) {
  const card = props.card;
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null || user !== undefined) {
      }
    });
  }, []);

  if (props.card.likesCount === undefined) {
  }
  return <CardActions />;
}

export default CardActionsContainer;
