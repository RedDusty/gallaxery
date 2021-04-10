import React from 'react';
import CardLike from './CardLike';

const CardActions = ({ cardInfo, setLike, userInfo }) => {
  return (
    <div className="c-a">
      <CardLike cardInfo={cardInfo} setLike={setLike} userInfo={userInfo} />
    </div>
  );
};

export default CardActions;
