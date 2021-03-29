import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  tagSearchDelete,
  tagParserOnKeyDown,
  tagParserOnKeyUp,
  tagSearchRemove,
  tagSearchAdd,
} from '../../../redux/actions/actionsHeader';
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
            className={`tag-container-${styleTag} tag-container fa br25`}
            key={index}
          >
            <p className={`tag-text tag-text-${styleTag} fW500`}>{tag.tag}</p>
            <button
              className="tag-delete btn-img-core btn-img-fill"
              onClick={() => {
                btnSearchDelete(index);
              }}
            >
              <img src={tagDelIcon} data-alt="✖" />
            </button>
            <button
              className="tag-exclude btn-img-core btn-img-fill"
              onClick={() => {
                btnSearchRemove(index);
              }}
            >
              <img src={tagRemoveIcon} data-alt="➖" />
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
            className={`tag-container-${styleTag} tag-container  fa br25`}
            key={index}
          >
            <p className={`tag-text tag-text-${styleTag} fW500`}>{tag.tag}</p>
            <button
              className="tag-delete btn-img-core btn-img-fill"
              onClick={() => {
                btnSearchDelete(index);
              }}
            >
              <img src={tagDelIcon} data-alt="✖" />
            </button>
            <button
              className="tag-add btn-img-core btn-img-fill"
              onClick={() => {
                btnSearchAdd(index);
              }}
            >
              <img src={tagAddIcon} data-alt="➕" />
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

  return <ModalSearch vars={vars} functions={functions} />;
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
