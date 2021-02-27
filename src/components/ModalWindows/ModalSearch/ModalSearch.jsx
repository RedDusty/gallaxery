import React, { useRef } from 'react';
import Modal from '../../Modal';
import SearchLabel from './SearchLabel';
import TagsCol from './TagsCol';

function ModalSearch(props) {
  //   const querySearchTags = props.vars.querySearchTags;
  //   const queryExcludeTags = props.vars.queryExcludeTags;
  //   const officialTags = props.vars.officialTags;
  //   const lastTags = props.vars.lastTags;
  //   const popularTags = props.vars.popularTags;
  const querySearchTags = [];
  const queryExcludeTags = [];
  const officialTags = [];
  const lastTags = [];
  const popularTags = [];

  const setIsOpen = props.vars.setIsOpen;
  const isOpen = props.vars.isOpen;
  const searches = props.vars.searches;
  const userAllowed = props.vars.userAllowed;

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
        <div className="ms-window">
          <div className="ms-actions">
            <div className="ms-labels">
              <div className="ms-labels-include">
                <div className="ms-labels-text">Include results from: </div>
                <SearchLabel
                  searchEngine={'Official images'}
                  color={'blue'}
                  state={userAllowed.confirmedImages}
                  setState={userAllowed.setConfirmedImages}
                ></SearchLabel>
                <SearchLabel
                  searchEngine={'User images'}
                  color={'green'}
                  state={userAllowed.userImages}
                  setState={userAllowed.setUserImages}
                ></SearchLabel>
                <SearchLabel
                  searchEngine={'Anonymous images'}
                  color={'red'}
                  state={userAllowed.anonymousImages}
                  setState={userAllowed.setAnonymousImages}
                ></SearchLabel>
              </div>
              <div className="ms-labels-include">
                <div className="ms-labels-text">Include results from: </div>
                <SearchLabel
                  searchEngine={'google'}
                  color={'blue'}
                  state={searches.searchGoogle}
                  setState={searches.setSearchGoogle}
                />
                <SearchLabel
                  searchEngine={'pinterest'}
                  color={'red'}
                  state={searches.searchPinterest}
                  setState={searches.setSearchPinterest}
                />
                <SearchLabel
                  searchEngine={'imgur'}
                  color={'green'}
                  state={searches.searchImgur}
                  setState={searches.setSearchImgur}
                />
              </div>
            </div>
            <button
              className="btn"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </button>
          </div>
          <div className="ms-tags-panel">
            <TagsCol tagsText={'Search'} queryTags={querySearchTags} />
            <TagsCol tagsText={'Exclude'} queryTags={queryExcludeTags} />
            <TagsCol tagsText={'Official'} queryTags={officialTags} />
            <TagsCol tagsText={'Last'} queryTags={lastTags} />
            <TagsCol tagsText={'Popular'} queryTags={popularTags} />
          </div>
        </div>
      </section>
    </Modal>
  );
}

export default ModalSearch;
