import React from 'react';
import CardImage from './CardImage';
import CardInfo from './CardInfo';

const Card = ({ card, cardTags }) => {
  return (
    <section className="card">
      <div className="c-container">
        <div className="c-container-border">
          <CardImage card={card} />
          <CardInfo card={card} cardTags={cardTags} />
        </div>
      </div>
    </section>
  );
};

export default Card;
