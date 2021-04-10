import React from 'react';
import CardImage from './CardImage';
import CardInfo from './CardInfo';

import loadingSvg from '../../images/loading.svg';

const Card = ({
  cardInfo,
  cardUserInfo,
  fileInfo,
  cardTags,
  isLoading,
  cardDelete,
}) => {
  let loadingCard = <></>;

  if (isLoading || cardDelete) {
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
            cardUserInfo={cardUserInfo}
            cardTags={cardTags}
          />
        </div>
      </div>
    </section>
  );
};

export default Card;
