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

function ModalSearchContainer(props) {
  const setIsOpen = props.setIsOpen;
  const isOpen = props.isOpen;
  const searches = props.searches;
  const userAllowed = props.userAllowed;
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

  const queryTags = query.map((tag, index) => {
    const styleTag = tag.removed === true ? 'tagRemoved' : 'tagNotRemoved';
    const tagOption =
      tag.removed === true ? (
        <button
          className="tagBtnAdd tagBtn"
          onClick={() => {
            btnSearchAdd(index);
          }}
        ></button>
      ) : (
        <button
          className="tagBtnRemove tagBtn"
          onClick={() => {
            btnSearchRemove(index);
          }}
        ></button>
      );
    return (
      <div className={'tagDiv ' + styleTag} data-tag={tag.tag} key={index}>
        <div className="tagText">{tag.tag}</div>
        <button
          className="tagBtnDelete tagBtn"
          onClick={() => {
            btnSearchDelete(index);
          }}
        ></button>
        {tagOption}
      </div>
    );
  });

  const vars = {
    queryTags,
    setIsOpen,
    isOpen,
    searches,
    userAllowed,
  };
  const functions = {};

  return <ModalSearch vars={vars} functions={functions} />;
}

const mapStateToProps = (state) => {
  return {
    searchTags: state.searchReducer.tags,
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
