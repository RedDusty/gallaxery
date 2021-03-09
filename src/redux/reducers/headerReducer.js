import {
  HDR_TAG_SEARCH,
  HDR_TAG_PARSE_ONKEYDOWN,
  HDR_TAG_PARSE_ONKEYUP,
  MS_TAG_SEARCH_DELETE,
  MS_TAG_SEARCH_REMOVE,
  MS_TAG_SEARCH_ADD,
} from '../types';

const initialState = {
  tags: [],
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case HDR_TAG_SEARCH: {
      return state;
    }
    case HDR_TAG_PARSE_ONKEYDOWN: {
      const { e } = action.payload;
      let queryReturn = [];
      if (e !== '') {
        if (/\s/.test(e.target.value)) {
          const val = e.target.value.match(/[^ -][^ ]*/g);
          if (val !== null) {
            val.map((tag) => {
              if (
                tag !== '' ||
                tag !== ' ' ||
                tag !== undefined ||
                tag !== null
              ) {
                let canPush = true;
                for (let index = 0; index < state.tags.length; index++) {
                  if (state.tags[index].tag === tag) {
                    canPush = false;
                  }
                }
                if (canPush) {
                  queryReturn.push({
                    tag: tag,
                    removed: false,
                  });
                }
              }
            });
          }
        }
      }
      const newState = [...new Set(state.tags.concat(queryReturn))];
      return {
        ...state,
        tags: newState,
      };
    }
    case HDR_TAG_PARSE_ONKEYUP: {
      const { e, clearAction } = action.payload;
      if (/\s/.test(e.target.value)) {
        e.target.value = '';
      }
      if (clearAction === 'clear') {
        e.target.value = '';
      }
      return {
        ...state,
      };
    }
    case MS_TAG_SEARCH_DELETE: {
      const { tagId } = action.payload;
      state.tags.splice(tagId, 1);
      return {
        ...state,
      };
    }
    case MS_TAG_SEARCH_REMOVE: {
      const { tagId } = action.payload;
      state.tags[tagId].removed = true;
      return {
        ...state,
      };
    }
    case MS_TAG_SEARCH_ADD: {
      const { tagId } = action.payload;
      state.tags[tagId].removed = false;
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
