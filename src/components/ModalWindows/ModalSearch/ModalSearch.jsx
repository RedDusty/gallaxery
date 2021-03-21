import React, { useContext } from 'react';
import Modal from '../../Modal';
import SearchLabel from './SearchLabel';
import TagsCol from './TagsCol';

function ModalSearch(props) {
  const searchParams = props.searchParams;
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

  const searches = searchParams;

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
        <div className="ms-window">
          <div className="ms-actions">
            <div className="ms-labels">
              <div className="ms-labels-include">
                <div className="ms-labels-text">Include results from: </div>
                <SearchLabel
                  searchEngine={'gallaxery'}
                  color={'blueLight'}
                  state={searches.searchGallaxery}
                  setState={searches.setSearchGallaxery}
                  tabIndex="23"
                />
                <SearchLabel
                  searchEngine={'google'}
                  color={'blue'}
                  state={searches.searchGoogle}
                  setState={searches.setSearchGoogle}
                  tabIndex="23"
                />
                <SearchLabel
                  searchEngine={'pinterest'}
                  color={'red'}
                  state={searches.searchPinterest}
                  setState={searches.setSearchPinterest}
                  tabIndex="24"
                />
                <SearchLabel
                  searchEngine={'imgur'}
                  color={'green'}
                  state={searches.searchImgur}
                  setState={searches.setSearchImgur}
                  tabIndex="25"
                />
                <SearchLabel
                  searchEngine={'unsplash'}
                  color={'grey'}
                  state={searches.searchUnsplash}
                  setState={searches.setSearchUnsplash}
                  tabIndex="25"
                />
              </div>
            </div>
            <button
              className="btn"
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
