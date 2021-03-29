import React from 'react';

const TagsCol = (props) => {
  const tagsText = props.tagsText;
  let queryTags = props.queryTags;

  queryTags = queryTags.filter((tag) => {
    if (tag.length !== 0) return tag;
  });

  return (
    <div className="ms-tags-col bgLightAlt" open>
      <p
        className="ms-tags-title br15 fja bgHighAlt fS18 fW500"
        tabIndex={props.tabIndex}
      >
        {tagsText}
      </p>
      <div className="ms-tags-query">
        {queryTags.length === 0 ? 'There are no tags.' : queryTags}
      </div>
    </div>
  );
};

export default TagsCol;
