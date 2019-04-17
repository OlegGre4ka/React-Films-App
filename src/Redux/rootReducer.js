import {combineReducers} from 'redux';
import paginationReducer from './paginationReducer';
import filmDetailedReducer from './filmDetailedReducer';
import actorDetailedReducer from './actorDetailedReducer';
import searchFilmReducer from './searchFilmReducer';
import searchActorReducer from './searchActorReducer';

export default combineReducers({
  paginationReducer, filmDetailedReducer, actorDetailedReducer,
  searchFilmReducer, searchActorReducer
  })