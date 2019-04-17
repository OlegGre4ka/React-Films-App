const initialState = {
    film:[],
    films:[]
   };
   
   export default function filmDetailedReducer(state = initialState, action) {
       // console.log(state,'confirmReducer')
       switch (action.type) {
         case "UPDATE_FILM_DETAILED":
           return { film: action.payload, films:action.payloadFilms };
     
         default:
           return state;
     }
   }