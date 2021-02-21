import react, { useState } from "react";
import { connect } from "react-redux";
import { tagParserOnKeyDown, tagParserOnKeyUp } from "../../redux/actions";
import SideBar from "./SideBar";

function SideBarContainer(props) {
  const [query, setQuery] = useState([]);

  function btnOnKeyDown(e) {
    props.tagParserOnKeyDown(e);
    setQuery(props.searchTags);
  }

  function btnOnKeyUp(e, action) {
    props.tagParserOnKeyUp(e, action);
    setQuery(props.searchTags);
  }

  const queryTags = query.map((tag, index) => {
    return (
      <div className="tagDiv" data-tag={tag} key={index}>
        <div className="tagText">{tag}</div>
        <button className="tagBtnDelete tagBtn"></button>
        <button className="tagBtnRemove tagBtn"></button>
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
  console.log(state);
  return {
    searchTags: state.searchReducer.tags,
  };
};

const mapDispatchToProps = {
  tagParserOnKeyDown,
  tagParserOnKeyUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);
