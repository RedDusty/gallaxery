import React, { useEffect } from 'react';
import CardActions from './CardActions';

import { connect } from 'react-redux';
import {
  getCardIsLiked,
  setCardLike,
} from '../../../redux/actions/actionsCard';

function CardActionsContainer(props) {
  useEffect(() => {
    if (props.userInfo.uid !== '' && props.cardInfo.id !== '') {
      props.getCardIsLiked(props.cardInfo, props.userInfo.uid);
    }
  }, [props.cardInfo, props.userInfo.uid]);

  function setLike(card, uid) {
    props.setCardLike(card, uid);
  }

  return (
    <CardActions
      cardInfo={props.cardInfo}
      setLike={setLike}
      userInfo={props.userInfo}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
    cardInfo: state.cardReducer.cardInfo,
  };
};

const mapDispatchToProps = {
  getCardIsLiked,
  setCardLike,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardActionsContainer);
