import {
  UC_TAG_DELETE,
  UC_TAG_PARSE,
  UC_TAG_KEYUP,
  UC_TEXTAREA,
  UC_FILEUPLOAD,
  UC_FILEIMAGEDLETE,
} from '../types';

const initialState = {
  uc_tags: [],
  fileURL: '',
  fileName: '',
  fileSize: '',
  fileType: '',
  fileCode: '',
  textareaTitle: '',
  textareaDescription: '',
};

export default function uploadCardReducer(state = initialState, action) {
  switch (action.type) {
    case UC_TAG_PARSE: {
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
                for (let index = 0; index < state.uc_tags.length; index++) {
                  if (state.uc_tags[index].tag === tag) {
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
      }
      const newState = [...new Set(state.uc_tags.concat(queryReturn))];
      return {
        ...state,
        uc_tags: newState,
      };
    }
    case UC_TAG_KEYUP: {
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
    case UC_TAG_DELETE: {
      const { tagId } = action.payload;
      state.uc_tags.splice(tagId, 1);
      return {
        ...state,
      };
    }
    case UC_FILEUPLOAD: {
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
    case UC_FILEIMAGEDLETE: {
      return {
        ...state,
        fileURL: '',
        fileName: '',
        fileSize: '',
        fileType: '',
        fileCode: '',
      };
    }
    case UC_TEXTAREA: {
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
