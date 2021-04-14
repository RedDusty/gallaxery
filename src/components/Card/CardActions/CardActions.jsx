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
  setIsComments,
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
    <div className="c-a">
      <div className="c-a-act">
        <CardLike cardInfo={cardInfo} setLike={setLike} userInfo={userInfo} />
        {editBtn}
        <CardDelete
          isOpenDelete={isOpenDelete}
          confirmDelete={confirmDelete}
          deleteCardCheck={deleteCardCheck}
        />
      </div>
      <button
        className="btn-core btn-fill btn-big"
        onClick={() => {
          setIsComments(true);
        }}
      >
        Switch to comments
      </button>
    </div>
  );
};

export default CardActions;
