import React from 'react';
import CardImage from './CardImage';
import CardInfo from './CardInfo';

const Card = ({ cardInfo, userInfo, fileInfo, cardTags }) => {
  return (
    <section className="card">
      <div className="c-container">
        <div className="c-container-border">
          <CardImage fileInfo={fileInfo} />
          <CardInfo
            cardInfo={cardInfo}
            userInfo={userInfo}
            cardTags={cardTags}
          />
        </div>
      </div>
    </section>
  );
};

export default Card;
