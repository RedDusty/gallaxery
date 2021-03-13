import React from 'react';

const HeaderSearch = ({
  modalSearchIsOpen,
  setModalSearchIsOpen,
  btnOnKeyUp,
  btnOnKeyDown,
}) => {
  return (
    <div className="search">
      <div className="search-div">
        <button
          className="search-icon search-icon-extended btn"
          tabIndex="2"
          onClick={() => {
            setModalSearchIsOpen(!modalSearchIsOpen);
          }}
        >
          <div />
        </button>
        <input
          type="text"
          className="search-input search-btn"
          placeholder="Search..."
          onKeyUp={btnOnKeyUp}
          onChange={btnOnKeyDown}
          onClick={() => {
            setModalSearchIsOpen(true);
          }}
          tabIndex="3"
        ></input>
        <button
          className="search-icon search-icon-magnifier btn btn-icon"
          tabIndex="4"
        >
          <div />
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
