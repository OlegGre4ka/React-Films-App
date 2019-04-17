const initialState = {
    searchWord:'',
    searchedFilmData:[]
   };
   
   export default function searchFilmReducer(state = initialState, action) {
       switch (action.type) {
        //  case "UPDATE_SEARCHED_DATA":
        //    return { searchFilmWord: action.payload };
           case "UPDATE_SEARCHED_FILM_DATA":
           return { searchWord: action.payloadWord,searchedFilmData:action.payloadFilms };
         default:
           return state;
     }
   }