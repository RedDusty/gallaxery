import { UF_TAG_DELETE, UF_TAG_PARSE, UF_TEXTAREA } from '../types';

const initialState = {
  uf_tags: [],
};

export default function uploadFileReducer(state = initialState, action) {
  switch (action.type) {
    case UF_TAG_PARSE: {
      const { e } = action.payload;
      let queryReturn = [];
      if (e.key === 'Space' || e.key === 32 || e.key === ' ') {
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
              for (let index = 0; index < state.uf_tags.length; index++) {
                if (state.uf_tags[index].tag === tag) {
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
      const newState = [...new Set(state.uf_tags.concat(queryReturn))];
      return {
        ...state,
        uf_tags: newState,
      };
    }
    case UF_TAG_DELETE: {
      const { tagId, count } = action.payload;
      state.uf_tags.splice(tagId, 1);
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
