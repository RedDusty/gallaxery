import React from 'react';

const TagsCol = (props) => {
  const tagsText = props.tagsText;
  let queryTags = props.queryTags;

  queryTags = queryTags.filter((tag) => {
    if (tag.length !== 0) return tag;
  });

  return (
    <details className="ms-tags-col" open>
      <summary className="ms-tags-summary" tabIndex={props.tabIndex}>
        {tagsText}
      </summary>
      <div className="ms-tags-query">
        {queryTags.length === 0 ? 'There are no tags.' : queryTags}
      </div>
    </details>
  );
};

export default TagsCol;
