import {
  UF_TAG_DELETE,
  UF_TAG_PARSE,
  UF_TEXTAREA,
  UF_FILEUPLOAD,
  UF_FILEIMAGEDLETE,
} from '../types';

const initialState = {
  uf_tags: [],
  fileURL: '',
  fileName: '',
  fileSize: '',
  fileType: '',
  fileCode: '',
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
      const { tagId } = action.payload;
      state.uf_tags.splice(tagId, 1);
      return {
        ...state,
      };
    }
    case UF_FILEUPLOAD: {
      const { file } = action.payload;
      return {
        ...state,
        fileURL: file.source,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileCode: 'return',
      };
    }
    case UF_FILEIMAGEDLETE: {
      return {
        ...state,
        fileURL: '',
        fileName: '',
        fileSize: '',
        fileType: '',
        fileCode: '',
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
}
