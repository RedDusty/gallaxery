import react, { useState } from "react";
import SideBar from "./SideBar";

function SideBarContainer(props) {
  const [query, setQuery] = useState([]);

  function tagParserOnKeyDown(e) {
    if (e.key === "Space" || e.key === 32 || e.key === " ") {
      const val = e.target.value.match(/[^ -][^ ]*$/);
      if (val !== null && val !== undefined && val !== "" && val !== " ") {
        setQuery(() => {
          return [...new Set(query.concat(val))];
        });
      }
    }
  }

  function tagParserOnKeyUp(e, action) {
    if (e.key === "Space" || e.key === 32 || e.key === " ") {
      e.target.value = "";
    }
    if (action === "clear") {
      e.target.value = "";
    }
  }

  function tagParserOnPaste(e) {
    setTimeout(() => {
      const val = e.target.value.match(/[^ -][^ ]*/g);
      if (val !== null && val !== undefined && val !== "" && val !== " ") {
        setQuery(() => {
          return [...new Set(query.concat(val))];
        });
      }
      tagParserOnKeyUp(e, "clear");
    }, 1);
  }

  const queryTags = query.map((tag, index) => {
    return (
      <div className="tagDiv" data-tag={tag} key={index}>
        <div className="tagText">{tag}</div>
        <button className="tagRemove"></button>
      </div>
    );
  });

  const vars = {
    queryTags,
  };
  const functions = {
    tagParserOnKeyDown,
    tagParserOnKeyUp,
    tagParserOnPaste,
  };

  return <SideBar vars={vars} functions={functions} />;
}

export default SideBarContainer;
