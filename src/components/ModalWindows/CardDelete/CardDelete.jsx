import React from 'react';
import Modal from '../../Modal';
import './cardDelete.scss';

const CardDelete = ({ isOpenDelete, confirmDelete, deleteCardCheck }) => {
  if (!isOpenDelete) return null;
  return (
    <Modal>
      <div className="fcj cd">
        <div className="cd-black fja">
          <div className="cd-container br15 fcj">
            <div className="cd-text">
              <p className="fW600 fS18">
                Are you sure you want to delete this card?
              </p>
            </div>
            <div className="cd-actions fjs">
              <button
                className="btn-core btn-fill fS18 btn-big"
                onClick={() => {
                  deleteCardCheck();
                  confirmDelete();
                }}
              >
                Delete
              </button>
              <button
                className="btn-core btn-fill fS18 btn-big"
                onClick={() => {
                  confirmDelete();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardDelete;
