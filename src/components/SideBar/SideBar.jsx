import "./sidebar.scss";

function SideBar(props) {
  const btnOnKeyDown = props.functions.btnOnKeyDown;
  const btnOnKeyUp = props.functions.btnOnKeyUp;
  const queryTags = props.vars.queryTags;

  return (
    <section className="SideBar">
      <div className="searchSection">
        <div className="searchPanel">
          <div className="inputSearchDiv">
            <input
              type="text"
              className="inputSearchEdit"
              placeholder="Search..."
              onKeyDown={btnOnKeyDown}
              onKeyUp={btnOnKeyUp}
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
