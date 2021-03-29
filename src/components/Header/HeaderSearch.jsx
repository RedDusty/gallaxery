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
          className="btn-img-core btn-img-fill search-btn"
          tabIndex="2"
          onClick={() => {
            setModalSearchIsOpen(!modalSearchIsOpen);
          }}
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
        <button className="btn-img-core btn-img-fill search-btn" tabIndex="4">
          <img src={searchMag} data-alt="🔎" data-btn="btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
