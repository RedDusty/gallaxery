import React, { useContext } from 'react';
import Modal from '../../Modal';
import ModalSearchActions from './ModalSearchActions';

function ModalSearch(props) {
  let querySearchTags = props.vars.querySearchTags;
  const setSearchBy = props.vars.setSearchBy;
  const searchBy = props.vars.searchBy;

  const setIsOpen = props.vars.setIsOpen;
  const isOpen = props.vars.isOpen;

  if (!isOpen) return null;

  querySearchTags = querySearchTags.filter((tag) => {
    if (tag.length !== 0) return tag;
  });

  return (
    <Modal>
      <section className="ms">
        <div
          className="ms-close"
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
        <div className="ms-window bgLight">
          <div className="ms-actions">
            <ModalSearchActions
              setSearchBy={setSearchBy}
              searchBy={searchBy}
              setIsOpen={setIsOpen}
              tagCleaner={props.functions.tagCleaner}
              searchInput={props.vars.searchInput}
              btnParseButton={props.functions.btnParseButton}
              dateRef={props.vars.dateRef}
              dateParseButton={props.functions.dateParseButton}
            />
          </div>
          <div className="ms-tags-panel br25">{querySearchTags}</div>
        </div>
      </section>
    </Modal>
  );
}

export default ModalSearch;
