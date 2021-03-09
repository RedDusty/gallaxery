import { combineReducers } from 'redux';
import headerReducer from './headerReducer';
import galleryReducer from './galleryReducer';
import uploadFileReducer from './uploadFileReducer';

export default combineReducers({
  headerReducer,
  galleryReducer,
  uploadFileReducer,
});
