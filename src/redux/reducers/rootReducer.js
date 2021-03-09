import { combineReducers } from 'redux';
import headerReducer from './headerReducer';
import blocksReducer from './blocksReducer';
import uploadFileReducer from './uploadFileReducer';

export default combineReducers({
  headerReducer,
  blocksReducer,
  uploadFileReducer,
});
