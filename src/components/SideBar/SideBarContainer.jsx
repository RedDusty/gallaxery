import react, { useState } from "react";
import SideBar from "./SideBar";

function SideBarContainer(props) {
  let [query, setQuery] = useState([]);

  // function tagParserOnInput(e) {
  //   if (e.key === "Space" || e.key === 32 || e.key === " ") {
  //     setQuery(() => {
  //       console.log([...new Set([...query, ...e.target.value.split(" ")])]);
  //     });
  //     e.target.value = "";
  //   }
  // }
  // function tagParserOnPaste(e) {
  //   setQuery(() => {
  //     console.log(query);
  //     console.log([...new Set([...query, ...e.target.value.split(" ")])]);
  //   });
  //   e.target.value = "";
  // }

  // console.log(query);
  // const vars = {};
  // const functions = {
  //   tagParserOnInput,
  //   tagParserOnPaste,
  // };

  return <SideBar />;
}

export default SideBarContainer;
