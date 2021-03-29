import React, { useContext } from 'react';
import Modal from '../../Modal';
import TagsCol from './TagsCol';

function ModalSearch(props) {
  const querySearchTags = props.vars.querySearchTags;
  const queryExcludeTags = props.vars.queryExcludeTags;
  //   const officialTags = props.vars.officialTags;
  //   const lastTags = props.vars.lastTags;
  //   const popularTags = props.vars.popularTags;
  // const querySearchTags = [];
  // const queryExcludeTags = [];
  const officialTags = [];
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
            <button
              className="btn-core btn-fill fS18 fW600"
              onClick={() => {
                setIsOpen(false);
              }}
              tabIndex="26"
            >
              Close
            </button>
          </div>
          <div className="ms-tags-panel">
            <TagsCol
              tagsText={'Search'}
              queryTags={querySearchTags}
              tabIndex="27"
            />
            <TagsCol
              tagsText={'Exclude'}
              queryTags={queryExcludeTags}
              tabIndex="28"
            />
            <TagsCol
              tagsText={'Official'}
              queryTags={officialTags}
              tabIndex="29"
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
