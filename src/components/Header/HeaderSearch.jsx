import React from 'react';
import { useHistory } from 'react-router';
import searchExt from '../../images/search/searchExtended.svg';
import searchMag from '../../images/search/searchIcon.svg';

const HeaderSearch = ({
  modalSearchIsOpen,
  setModalSearchIsOpen,
  btnOnKeyUp,
  btnOnKeyDown,
  searchStart,
  searchInput,
  searchBy,
  isLoadingCards,
}) => {
  let searchType = 'text';
  if (searchBy === 'byDate') {
    searchType = 'date';
  }
  const history = useHistory();
  const style = isLoadingCards === false ? 'not-allowed' : 'pointer';
  const titleMagnifier =
    isLoadingCards === false ? 'Wait loading...' : 'Search';
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
          type={searchType}
          className="search-input brdGray fS18 fW600 input-fill"
          placeholder="Search..."
          onKeyUp={btnOnKeyUp}
          onChange={btnOnKeyDown}
          onClick={() => {
            setModalSearchIsOpen(true);
          }}
          tabIndex="3"
          ref={searchInput}
        ></input>
        <button
          className="btn-img-core btn-img-fill search-btn search-btn-magn"
          tabIndex="4"
          title={titleMagnifier}
          style={{ cursor: style }}
          onClick={() => {
            history.push('/');
            if (isLoadingCards) {
              searchStart();
            }
          }}
        >
          <img src={searchMag} data-alt="🔎" data-btn="btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
