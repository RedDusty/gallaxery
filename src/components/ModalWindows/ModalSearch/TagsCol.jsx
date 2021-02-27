import React from 'react';

const TagsCol = (props) => {
  const tagsText = props.tagsText;
  const queryTags = props.queryTags;

  return (
    <div>
      <details className="ms-tags-col" open>
        <summary className="ms-tags-text">{tagsText}</summary>
        <div className="ms-tags-query">
          {queryTags.length === 0 ? 'There are no tags.' : queryTags}
        </div>
      </details>
    </div>
  );
};

export default TagsCol;
