import React from 'react';
import CardLike from './CardLike';
import delSvg from '../../../images/uploadCard/cardUploadDel.svg';
import CardDelete from '../../ModalWindows/CardDelete/CardDelete';

const CardActions = ({
  cardInfo,
  setLike,
  userInfo,
  cardUserInfo,
  confirmDelete,
  isOpenDelete,
  deleteCardCheck,
}) => {
  let editBtn = <></>;
  if (userInfo.uid === cardUserInfo.uid) {
    editBtn = (
      <button
        className="btn-img-core btn-img-fill c-a-del"
        title="Delete card"
        onClick={() => {
          confirmDelete();
        }}
      >
        <img src={delSvg} data-btn="btn-icon" title="Delete card" />
      </button>
    );
  }
  return (
    <div className="c-a fa">
      <CardLike cardInfo={cardInfo} setLike={setLike} userInfo={userInfo} />
      {editBtn}
      <CardDelete
        isOpenDelete={isOpenDelete}
        confirmDelete={confirmDelete}
        deleteCardCheck={deleteCardCheck}
      />
    </div>
  );
};

export default CardActions;
