import React from 'react';

const SearchLabel = (props) => {
  const searchEngine = props.searchEngine;
  const color = props.color;
  const state = props.state;
  const setState = props.setState;
  return (
    <label className={`ms-label-${color} ms-label`}>
      <div className={`ms-label-${color}-text ms-label-text `}>
        {searchEngine.charAt(0).toUpperCase() + searchEngine.slice(1)}&nbsp;
      </div>
      <input
        type="checkbox"
        className={`ms-label-${color}-toggle ms-label-toggle`}
        onClick={() => {
          setState(!state);
        }}
        defaultChecked={state}
        tabIndex={props.tabIndex}
      />
    </label>
  );
};

export default SearchLabel;
