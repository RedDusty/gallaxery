import react, { useRef } from "react";
import "./sidebar.scss";

function SideBar(props) {
  const tagParserOnKeyDown = props.functions.tagParserOnKeyDown;
  const tagParserOnKeyUp = props.functions.tagParserOnKeyUp;
  const tagParserOnPaste = props.functions.tagParserOnPaste;
  const queryTags = props.vars.queryTags;
  console.log(queryTags);

  return (
    <section className="SideBar">
      <div className="searchSection">
        <div className="searchPanel">
          <div className="inputSearchDiv">
            <input
              type="text"
              className="inputSearchEdit"
              placeholder="Search..."
              onKeyDown={tagParserOnKeyDown}
              onKeyUp={tagParserOnKeyUp}
              onPaste={tagParserOnPaste}
            />
            <button className="searchBtn"></button>
          </div>
        </div>
        <div className="tagsPanel">{queryTags}</div>
      </div>
    </section>
  );
}

export default SideBar;
