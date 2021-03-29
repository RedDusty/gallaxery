import React from 'react';
import CardImage from './CardImage';
import CardInfo from './CardInfo';

import loadingSvg from '../../images/loading.svg';

const Card = ({ cardInfo, userInfo, fileInfo, cardTags, isLoading }) => {
  let loadingCard = <></>;

  if (isLoading) {
    loadingCard = (
      <div className="cv-loading fja">
        <img src={loadingSvg} alt="Loading" className="cv-loading-svg br100" />
      </div>
    );
  }
  return (
    <section className="card fja">
      <div className="cvp-container bgLightAlt br25">
        <div className="cvp-container-border br25 fa">
          {loadingCard}
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
