import {
  CA_CARD_INFO,
  CA_CARD_LOAD,
  CA_GET_ISLIKED,
  CA_CARD_DELETE,
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
  isLoadingCard: true,
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
      return {
        ...state,
        ...{ cardInfo: action.payload.card },
      };
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
    default:
      return {
        ...state,
      };
  }
}
