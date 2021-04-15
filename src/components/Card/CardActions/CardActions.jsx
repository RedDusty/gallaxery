import React from 'react';
import CardLike from './CardLike';
import delSvg from '../../../images/uploadCard/cardUploadDel.svg';
import CardDelete from '../../ModalWindows/CardDelete/CardDelete';
import commentsSvg from '../../../images/gallery/comments.svg';

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
  let delBtn = <></>;
  if (userInfo.uid === cardUserInfo.uid) {
    delBtn = (
      <button
        className="btn-img-core btn-img-fill btn-img-big"
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
        <button
          className="btn-img-core btn-img-fill btn-img-big"
          onClick={() => {
            setIsComments(true);
          }}
        >
          <img
            src={commentsSvg}
            alt="Comments"
            title="Switch to comments"
            data-btn="btn-icon"
          />
        </button>
        {delBtn}
        <CardDelete
          isOpenDelete={isOpenDelete}
          confirmDelete={confirmDelete}
          deleteCardCheck={deleteCardCheck}
        />
      </div>
    </div>
  );
};

export default CardActions;
