import { combineReducers } from 'redux';
import headerReducer from './headerReducer';
import galleryReducer from './galleryReducer';
import uploadCardReducer from './uploadCardReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';
import cardReducer from './cardReducer';

export default combineReducers({
  headerReducer,
  galleryReducer,
  uploadCardReducer,
  userReducer,
  profileReducer,
  cardReducer,
});
