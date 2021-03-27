import { combineReducers } from 'redux';
import headerReducer from './headerReducer';
import galleryReducer from './galleryReducer';
import uploadCardReducer from './uploadCardReducer';
import userReducer from './userReducer';

export default combineReducers({
  headerReducer,
  galleryReducer,
  uploadCardReducer,
  userReducer,
});
