import {
  CA_CARD_INFO,
  CA_CARD_LOAD,
  CA_GET_ISLIKED,
  CA_CARD_DELETE,
  CA_CARD_TEXTAREA,
  CA_CARD_COMMENTS,
  CA_CARD_COMMENTS_LOAD,
  CA_CARD_COMMENT_DELETE,
  CA_CARD_COMMENTS_SEND,
} from '../types';

const initialState = {
  fileInfo: {
    fileName: '',
    fileSize: '',
    fileType: '',
    fileURL: '',
  },
  userInfo: {
    infoUsername: '',
    infoPhotoURL: '',
    uid: '',
  },
  cardInfo: {
    infoDate: 0,
    infoDescription: '',
    infoTags: [],
    infoTitle: '',
    id: '',
    likesCount: 0,
    isLiked: false,
  },
  commentsInfo: {
    comments: [],
    endCommentsLoadData: false,
    isLoadingCardComments: true,
    commentsLastKey: '',
  },
  likeBlock: false,
  commentInput: '',
};

export default function cardReducer(state = initialState, action) {
  switch (action.type) {
    case CA_CARD_INFO:
      const cardData = action.payload.card;
      const getLikesCount =
        action.payload.card.likesCount === undefined
          ? 0
          : action.payload.card.likesCount;
      const newState = {
        fileInfo: {
          fileName: cardData.fileName,
          fileSize: cardData.fileSize,
          fileType: cardData.fileType,
          fileURL: cardData.fileURL,
        },
        userInfo: {
          infoUsername: cardData.infoUsername,
          infoPhotoURL: cardData.infoPhotoURL,
          uid: cardData.uid,
        },
        cardInfo: {
          infoDate: cardData.infoDate,
          infoDescription: cardData.infoDescription,
          infoTags: cardData.infoTags,
          infoTitle: cardData.infoTitle,
          id: cardData.id,
          likesCount: getLikesCount,
        },
        commentsInfo: {
          comments: [],
          endCommentsLoadData: false,
          isLoadingCardComments: true,
          commentsLastKey: '',
        },
        isLoadingCard: false,
      };
      return {
        ...state,
        ...newState,
      };
    case CA_CARD_LOAD:
      return {
        ...state,
        ...{ isLoadingCard: true },
      };
    case CA_GET_ISLIKED: {
      if (action.payload.type == 'load') {
        return { ...state, ...{ likeBlock: true } };
      } else if (action.payload.type == 'endLoad') {
        return {
          ...state,
          ...{ cardInfo: action.payload.card },
          ...{ likeBlock: false },
        };
      }
      return { ...state };
    }
    case CA_CARD_DELETE: {
      if (!action.payload.process) {
        return {
          ...initialState,
          ...{ deleteProcess: false },
        };
      } else {
        return {
          ...state,
          ...{ deleteProcess: true },
        };
      }
    }
    case CA_CARD_COMMENTS: {
      function reverseArr(input) {
        var ret = new Array();
        for (var i = input.length - 1; i >= 0; i--) {
          ret.push(input[i]);
        }
        return ret;
      }
      const currentComments = action.payload.currentComments;
      const comments = action.payload.comments;
      const commentsLastKey = action.payload.commentsLastKey;
      const endCommentsLoadData = action.payload.endCommentsLoadData;
      let concatedComments =
        currentComments !== undefined
          ? currentComments.concat(comments)
          : comments;
      concatedComments = concatedComments.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );
      concatedComments = concatedComments.sort((a, b) => {
        return a.id - b.id;
      });

      const newState = {
        comments: concatedComments,
        commentsLastKey: commentsLastKey,
        isLoadingCardComments: true,
        endCommentsLoadData: endCommentsLoadData,
      };
      return { ...state, ...{ commentsInfo: newState } };
    }
    case CA_CARD_COMMENTS_LOAD: {
      return {
        ...state,
        ...{
          commentsInfo: {
            comments: state.commentsInfo.comments,
            endCommentsLoadData: state.commentsInfo.endCommentsLoadData,
            isLoadingCardComments: false,
            commentsLastKey: state.commentsInfo.commentsLastKey,
          },
        },
      };
    }
    case CA_CARD_COMMENT_DELETE: {
      let newCommentsArray = action.payload.comments;
      const commentId = newCommentsArray
        .map((item) => {
          return item.id;
        })
        .indexOf(action.payload.commentId);
      newCommentsArray.splice(commentId, 1);
      return {
        ...state,
        ...{
          commentsInfo: {
            comments: newCommentsArray,
            endCommentsLoadData: state.commentsInfo.endCommentsLoadData,
            isLoadingCardComments: state.commentsInfo.isLoadingCardComments,
            commentsLastKey: state.commentsInfo.commentsLastKey,
          },
        },
      };
    }
    case CA_CARD_TEXTAREA: {
      const textareaRef = action.payload.textareaRef;
      const textareaContRef = action.payload.textareaContRef;
      const symbolCountRef = action.payload.symbolCountRef;
      textareaRef.current.value = textareaRef.current.value.replace(
        /[\t\n\r]+/gm,
        ' '
      );

      textareaRef.current.value = textareaRef.current.value.slice(0, 500);

      symbolCountRef.current.textContent =
        textareaRef.current.value.length + '/250';

      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
      textareaContRef.current.style.height = 'auto';
      textareaContRef.current.style.height =
        textareaContRef.current.scrollHeight + -4 + 'px';

      if (textareaRef.current.value.length > 250) {
        document.documentElement.style.setProperty('--ccInput', 'var(--error)');
      }
      if (textareaRef.current.value.length < 251) {
        document.documentElement.style.setProperty('--ccInput', 'var(--black)');
      }
      return {
        ...state,
        commentInput: textareaRef.current.value.slice(0, 250),
      };
    }
    case CA_CARD_COMMENTS_SEND: {
      let concatedComments =
        state.commentsInfo.currentComments !== undefined
          ? state.commentsInfo.currentComments.concat(action.payload.comments)
          : action.payload.comments;
      concatedComments = concatedComments.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );
      concatedComments = concatedComments.sort((a, b) => {
        return a.id - b.id;
      });
      const refs = action.payload.refs;
      refs.symbolCountRef.current.textContent =
        refs.textareaRef.current.value.length + '/250';

      refs.textareaRef.current.style.height = 'auto';
      refs.textareaRef.current.style.height =
        refs.textareaRef.current.scrollHeight + 'px';
      refs.textareaContRef.current.style.height = 'auto';
      refs.textareaContRef.current.style.height =
        refs.textareaContRef.current.scrollHeight + -4 + 'px';
      return {
        ...state,
        ...{
          commentsInfo: {
            comments: concatedComments,
            endCommentsLoadData: state.commentsInfo.endCommentsLoadData,
            isLoadingCardComments: state.commentsInfo.isLoadingCardComments,
            commentsLastKey: state.commentsInfo.commentsLastKey,
          },
        },
      };
    }
    default:
      return {
        ...state,
      };
  }
}
