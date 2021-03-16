import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  tagSearchDelete,
  tagParserOnKeyDown,
  tagParserOnKeyUp,
  tagSearchRemove,
  tagSearchAdd,
} from '../../../redux/actions';
import ModalSearch from './ModalSearch';
import './modalSearch.scss';

import tagDelIcon from '../../../images/search/tagDelete.svg';
import tagAddIcon from '../../../images/search/tagAdd.svg';
import tagRemoveIcon from '../../../images/search/tagRemove.svg';

function ModalSearchContainer(props) {
  const setIsOpen = props.setIsOpen;
  const isOpen = props.isOpen;
  const [query, setQuery] = useState([]);

  function queryUpdater(e = '') {
    setQuery(props.searchTags);
    props.tagParserOnKeyDown(e);
  }

  function btnSearchDelete(tagId) {
    props.tagSearchDelete(tagId);
    queryUpdater();
  }

  function btnSearchRemove(tagId) {
    props.tagSearchRemove(tagId);
    queryUpdater();
  }

  function btnSearchAdd(tagId) {
    props.tagSearchAdd(tagId);
    queryUpdater();
  }

  const querySearchTags = props.searchTags
    .filter((tag) => tag !== undefined)
    .map((tag, index) => {
      const styleTag = tag.removed === true ? 'removed' : 'standard';
      if (!tag.removed) {
        return (
          <div
            className={`tag-container-${styleTag} tag-container`}
            key={index}
          >
            <div className={`tag-text tag-text-${styleTag}`}>{tag.tag}</div>
            <button
              className="tag-delete btn btn-icon tag-btn"
              onClick={() => {
                btnSearchDelete(index);
              }}
            >
              <img src={tagDelIcon} alt="delete" />
            </button>
            <button
              className="tag-exclude btn btn-icon tag-btn"
              onClick={() => {
                btnSearchRemove(index);
              }}
            >
              <img src={tagRemoveIcon} alt="remove" />
            </button>
          </div>
        );
      }
      return [];
    });

  const queryExcludeTags = props.searchTags
    .filter((tag) => tag !== undefined)
    .map((tag, index) => {
      const styleTag = tag.removed === true ? 'removed' : 'standard';
      if (tag.removed) {
        return (
          <div
            className={`tag-container-${styleTag} tag-container`}
            key={index}
          >
            <div className={`tag-text tag-text-${styleTag}`}>{tag.tag}</div>
            <button
              className="tag-delete btn btn-icon tag-btn"
              onClick={() => {
                btnSearchDelete(index);
              }}
            >
              <img src={tagDelIcon} alt="delete" />
            </button>
            <button
              className="tag-add btn btn-icon tag-btn"
              onClick={() => {
                btnSearchAdd(index);
              }}
            >
              <img src={tagAddIcon} alt="add" />
            </button>
          </div>
        );
      }
      return [];
    });

  const vars = {
    querySearchTags,
    queryExcludeTags,
    setIsOpen,
    isOpen,
  };
  const functions = {};

  return (
    <ModalSearch
      vars={vars}
      functions={functions}
      searchParams={props.searchParams}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    searchTags: state.headerReducer.tags,
  };
};

const mapDispatchToProps = {
  tagParserOnKeyDown,
  tagParserOnKeyUp,
  tagSearchDelete,
  tagSearchRemove,
  tagSearchAdd,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalSearchContainer);
