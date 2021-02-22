// eslint-disable-next-line
import react, { useState } from "react";
import { connect } from "react-redux";
import { tagSearchDelete, tagParserOnKeyDown, tagParserOnKeyUp, tagSearchRemove, tagSearchAdd } from "../../redux/actions";
import SideBar from "./SideBar";

function SideBarContainer(props) {
  const [query, setQuery] = useState([]);

  function queryUpdater(e = '') {
    setQuery(props.searchTags)
    props.tagParserOnKeyDown(e);
  }

  function btnOnKeyDown(e) {
    props.tagParserOnKeyDown(e);
    queryUpdater()
  }

  function btnOnKeyUp(e, action) {
    props.tagParserOnKeyUp(e, action);
    queryUpdater()
  }

  function btnSearchDelete(tagId) {
    props.tagSearchDelete(tagId)
    queryUpdater()
  }

  function btnSearchRemove(tagId) {
    props.tagSearchRemove(tagId)
    queryUpdater()
  }

  function btnSearchAdd(tagId) {
    props.tagSearchAdd(tagId)
    queryUpdater()
  }

  const queryTags = query.map((tag, index) => {
    const styleTag = tag.removed === true ? "tagRemoved" : "tagNotRemoved"
    const tagOption = tag.removed === true ? (<button className="tagBtnAdd tagBtn" onClick={() => { btnSearchAdd(index) }}></button>) : (<button className="tagBtnRemove tagBtn" onClick={() => { btnSearchRemove(index) }}></button>)
    return (
      <div className={"tagDiv " + styleTag} data-tag={tag.tag} key={index}>
        <div className="tagText">{tag.tag}</div>
        <button className="tagBtnDelete tagBtn" onClick={() => { btnSearchDelete(index) }}></button>
        {tagOption}
      </div>
    );
  });

  const vars = {
    queryTags,
  };
  const functions = {
    btnOnKeyDown,
    btnOnKeyUp,
  };

  return <SideBar vars={vars} functions={functions} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);
