import React, { useContext } from 'react';
import Modal from '../../Modal';
import ModalSearchActions from './ModalSearchActions';
import TagsCol from './TagsCol';

function ModalSearch(props) {
  const querySearchTags = props.vars.querySearchTags;
  const setSearchBy = props.vars.setSearchBy;
  const searchBy = props.vars.searchBy;
  //   const lastTags = props.vars.lastTags;
  //   const popularTags = props.vars.popularTags;
  const lastTags = [];
  const popularTags = [];

  const setIsOpen = props.vars.setIsOpen;
  const isOpen = props.vars.isOpen;

  if (!isOpen) return null;

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
          <div className="ms-tags-panel">
            <TagsCol
              tagsText={'Search'}
              queryTags={querySearchTags}
              tabIndex="27"
            />
            <TagsCol tagsText={'Last'} queryTags={lastTags} tabIndex="30" />
            <TagsCol
              tagsText={'Popular'}
              queryTags={popularTags}
              tabIndex="31"
            />
          </div>
        </div>
      </section>
    </Modal>
  );
}

export default ModalSearch;
