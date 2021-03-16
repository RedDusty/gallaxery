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
  textareaTitle: '',
  textareaDescription: '',
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
                  tag,
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
    case UF_TEXTAREA: {
      const { textarea, areaAction } = action.payload;
      if (textarea.key === 'Enter' || textarea.key === 13) {
        textarea.preventDefault();
      }
      textarea.target.value = textarea.target.value.replace(/[\t\n\r]+/gm, ' ');

      const scrollLeft =
        window.pageXOffset ||
        (document.documentElement || document.body.parentNode || document.body)
          .scrollLeft;
      const scrollTop =
        window.pageYOffset ||
        (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
      textarea.target.style.height = 'auto';
      textarea.target.style.height = textarea.target.scrollHeight + 'px';
      window.scrollTo(scrollLeft, scrollTop);
      if (areaAction == 'comment') {
        if (textarea.target.value.length > 750) {
          document.documentElement.style.setProperty(
            '--finfoLenComment',
            'block'
          );
          return {
            ...state,
            textareaDescription: textarea.target.value.slice(0, 750),
          };
        }
        if (textarea.target.value.length < 751) {
          document.documentElement.style.setProperty(
            '--finfoLenComment',
            'none'
          );
          return {
            ...state,
            textareaDescription: textarea.target.value.slice(0, 750),
          };
        }
        return {
          ...state,
          textareaDescription: textarea.target.value.slice(0, 750),
        };
      }
      if (areaAction == 'name') {
        if (textarea.target.value.length > 250) {
          document.documentElement.style.setProperty('--finfoLenName', 'block');
          return {
            ...state,
            textareaTitle: textarea.target.value.slice(0, 250),
          };
        }
        if (textarea.target.value.length < 251) {
          document.documentElement.style.setProperty('--finfoLenName', 'none');
          return {
            ...state,
            textareaTitle: textarea.target.value.slice(0, 250),
          };
        }
        return {
          ...state,
          textareaTitle: textarea.target.value.slice(0, 250),
        };
      }
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
