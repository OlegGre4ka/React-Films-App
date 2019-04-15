import {combineReducers} from 'redux';
import paginationReducer from './paginationReducer';
import filmDetailedReducer from './filmDetailedReducer';


export default combineReducers({
  paginationReducer, filmDetailedReducer
  })