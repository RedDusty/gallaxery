import React, { useEffect, useState } from 'react';
import CardActions from './CardActions';

import { connect } from 'react-redux';
import {
  deleteCard,
  getCardIsLiked,
  setCardLike,
} from '../../../redux/actions/actionsCard';
import { useHistory } from 'react-router';

function CardActionsContainer(props) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (props.userInfo.uid !== '' && props.cardInfo.id !== '') {
      props.getCardIsLiked(props.cardInfo, props.userInfo.uid);
    }
  }, [props.cardInfo, props.userInfo.uid]);

  function confirmDelete() {
    setIsOpenDelete(!isOpenDelete);
  }

  function deleteCardCheck() {
    props.deleteCard(props.cardInfo.id, props.userInfo.uid, history);
  }

  function setLike(card, uid) {
    if (props.likeBlock === false) {
      props.setCardLike(card, uid);
    }
  }

  return (
    <CardActions
      cardInfo={props.cardInfo}
      setLike={setLike}
      userInfo={props.userInfo}
      cardUserInfo={props.cardUserInfo}
      confirmDelete={confirmDelete}
      isOpenDelete={isOpenDelete}
      deleteCardCheck={deleteCardCheck}
      setIsComments={props.setIsComments}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
    cardInfo: state.cardReducer.cardInfo,
    cardUserInfo: state.cardReducer.userInfo,
    likeBlock: state.cardReducer.likeBlock,
  };
};

const mapDispatchToProps = {
  getCardIsLiked,
  setCardLike,
  deleteCard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardActionsContainer);
