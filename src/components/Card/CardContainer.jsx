import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCardInfo } from '../../redux/actions/actionsCard';
import Card from './Card';
import './card.scss';

function CardContainer(props) {
  useEffect(() => {
    props.getCardInfo(window.location.pathname.substring(6));
  }, []);

  const cardTags = props.cardInfo.infoTags.map((tag, index) => {
    return (
      <div
        className={`tag-container-standard tag-container fa br25`}
        key={index}
      >
        <p className={`tag-text tag-text-standard fW500`}>{tag.tag}</p>
      </div>
    );
  });

  return (
    <>
      <Card
        cardInfo={props.cardInfo}
        userInfo={props.userInfo}
        fileInfo={props.fileInfo}
        cardTags={cardTags}
        isLoading={props.isLoading}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cardInfo: state.cardReducer.cardInfo,
    userInfo: state.cardReducer.userInfo,
    fileInfo: state.cardReducer.fileInfo,
    isLoading: state.cardReducer.isLoadingCard,
  };
};

const mapDispatchToProps = {
  getCardInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
