import react from "react";
import SideBar from "./SideBar";

function SideBarContainer(props) {
  function tagParserOnInput(e) {
    if (e.key === "Space" || e.key === 32 || e.key === " ") {
      console.log("Parse");
    }
  }
  const vars = {};
  const functions = {
    tagParserOnInput,
  };

  return <SideBar vars={vars} functions={functions} />;
}

export default SideBarContainer;
