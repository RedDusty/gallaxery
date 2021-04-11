import React from 'react';

const ModalSearchActions = ({
  searchBy,
  setSearchBy,
  setIsOpen,
  tagCleaner,
  searchInput,
  btnParseButton,
}) => {
  let addParam = <></>;
  if (searchBy !== 'byTags') {
    let addType = '';
    if (searchBy === 'byUsername') addType = 'username';
    if (searchBy === 'byDate') addType = 'date';
    addParam = (
      <div>
        <button
          className="btn-core btn-fill fS16 fW600 mtop mbottom"
          onClick={() => {
            btnParseButton(searchInput);
          }}
        >
          Add {addType}
        </button>
      </div>
    );
  }
  return (
    <div className="fa">
      <div className="ms-search fa bgHighAlt br25">
        <p className="fS18 fW500">Search by </p>
        <label
          htmlFor="byTags"
          className="btn-core btn-fill fW500 mtop mbottom"
        >
          tags
          <input
            type="radio"
            name="tags"
            id="byTags"
            checked={searchBy === 'byTags'}
            onChange={(e) => {
              tagCleaner();
              setSearchBy(e.target.id);
            }}
          />
        </label>
        <label
          htmlFor="byUsername"
          className="btn-core btn-fill fW500 mtop mbottom"
        >
          username
          <input
            type="radio"
            name="username"
            id="byUsername"
            checked={searchBy === 'byUsername'}
            onChange={(e) => {
              tagCleaner();
              setSearchBy(e.target.id);
            }}
          />
        </label>
        <label
          htmlFor="byDate"
          className="btn-core btn-fill fW500 mtop mbottom"
        >
          date
          <input
            type="radio"
            name="date"
            id="byDate"
            checked={searchBy === 'byDate'}
            onChange={(e) => {
              tagCleaner();
              setSearchBy(e.target.id);
            }}
          />
        </label>
      </div>
      <div className="ms-search fa bgHighAlt br15 mleft">
        {addParam}{' '}
        <button
          className="btn-core btn-fill fS18 fW600 mtop mbottom mleft"
          onClick={() => {
            setIsOpen(false);
          }}
          tabIndex="26"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalSearchActions;
