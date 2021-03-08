import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import blocksReducer from './blocksReducer';
import uploadFileReducer from './uploadFileReducer';

export default combineReducers({
  searchReducer,
  blocksReducer,
  uploadFileReducer,
});
