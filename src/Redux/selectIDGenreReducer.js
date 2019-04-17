const initialState = {
    genreID:null,
    genreName:'Genres'
   };
   
   export default function selectIDGenreReducer(state = initialState, action) {
       switch (action.type) {
         case "UPDATE_ID_GENRE":
           return { genreID: action.payload,genreName:action.payloadName };
     
         default:
           return state;
     }
   }