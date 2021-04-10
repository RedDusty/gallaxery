import React from 'react';
import searchExt from '../../images/search/searchExtended.svg';
import searchMag from '../../images/search/searchIcon.svg';

const HeaderSearch = ({
  modalSearchIsOpen,
  setModalSearchIsOpen,
  btnOnKeyUp,
  btnOnKeyDown,
}) => {
  return (
    <div className="search">
      <div className="bgHigh fja br25 search-inner">
        <button
          className="btn-img-core btn-img-fill search-btn search-btn-ext"
          tabIndex="2"
          onClick={() => {
            setModalSearchIsOpen(!modalSearchIsOpen);
          }}
          title="Search menu"
        >
          <img src={searchExt} data-alt="📝" data-btn="btn-icon" />
        </button>
        <input
          type="text"
          className="search-input brdGray fS18 fW600 input-fill"
          placeholder="Search..."
          onKeyUp={btnOnKeyUp}
          onChange={btnOnKeyDown}
          onClick={() => {
            setModalSearchIsOpen(true);
          }}
          tabIndex="3"
        ></input>
        <button
          className="btn-img-core btn-img-fill search-btn search-btn-magn"
          tabIndex="4"
          title="Search"
        >
          <img src={searchMag} data-alt="🔎" data-btn="btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
