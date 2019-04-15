import {combineReducers} from 'redux';
import paginationReducer from './paginationReducer';
import filmDetailedReducer from './filmDetailedReducer';
import actorDetailedReducer from './actorDetailedReducer';



export default combineReducers({
  paginationReducer, filmDetailedReducer, actorDetailedReducer
  })