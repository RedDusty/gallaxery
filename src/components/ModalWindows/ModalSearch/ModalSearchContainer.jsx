import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  tagSearchDelete,
  tagParserOnKeyDown,
  tagParserOnKeyUp,
  tagCleaner,
  tagParseOnButton,
  tagParseDate,
} from '../../../redux/actions/actionsHeader';
import ModalSearch from './ModalSearch';
import './modalSearch.scss';

import tagDelIcon from '../../../images/search/tagDelete.svg';

function ModalSearchContainer(props) {
  const setIsOpen = props.setIsOpen;
  const isOpen = props.isOpen;
  const [query, setQuery] = useState([]);
  const dateRef = useRef(null);

  useEffect(() => {}, [props.searchBy]);

  function queryUpdater(e = '') {
    setQuery(props.searchTags);
    props.tagParserOnKeyDown(e);
  }

  function btnSearchDelete(tagId) {
    props.tagSearchDelete(tagId);
    queryUpdater();
  }

  function btnParseButton(inputRef) {
    props.tagParseOnButton(inputRef);
  }

  function dateParseButton(inputRef) {
    props.tagParseDate(inputRef);
  }

  const querySearchTags = props.searchTags
    .filter((tag) => tag !== undefined)
    .map((tag, index) => {
      const styleTag = tag.removed === true ? 'removed' : 'standard';
      if (!tag.removed) {
        return (
          <div
            className="tag-container-standard tag-container fa br25"
            key={index}
          >
            <p className="tag-text tag-text-standard fW500">{tag}</p>
            <button
              className="tag-delete btn-img-core btn-img-fill"
              onClick={() => {
                btnSearchDelete(index);
              }}
            >
              <img src={tagDelIcon} data-alt="✖" />
            </button>
          </div>
        );
      }
      return [];
    });

  const vars = {
    querySearchTags,
    setIsOpen,
    isOpen,
    searchBy: props.searchBy,
    setSearchBy: props.setSearchBy,
    searchInput: props.searchInput,
    dateRef,
  };
  const functions = {
    tagCleaner: props.tagCleaner,
    btnParseButton,
    dateParseButton,
  };

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
  tagCleaner,
  tagParseOnButton,
  tagParseDate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalSearchContainer);
