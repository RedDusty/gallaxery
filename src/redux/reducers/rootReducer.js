import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import blocksReducer from "./blocksReducer";

export default combineReducers({ searchReducer, blocksReducer });
