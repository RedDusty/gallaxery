import react, { useRef } from "react";
import "./sidebar.scss";

function SideBar(props) {
  // const tagParserOnInput = props.functions.tagParserOnInput;
  // const tagParserOnPaste = props.functions.tagParserOnPaste;
  const textInput = useRef(null);

  return (
    <section className="SideBar">
      <div className="searchSection">
        <div className="searchPanel">
          <div className="inputSearchDiv">
            <input
              type="text"
              className="inputSearchEdit"
              placeholder="Search..."
              ref={textInput}
              // onInput={tagParserOnInput}
              // onPaste={tagParserOnPaste}
            />
            <button className="searchBtn"></button>
          </div>
        </div>
        <div className="tagsPanel">
          <div className="tagDiv">
            <div className="tagText">Лес</div>
            <button className="tagRemove"></button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SideBar;
