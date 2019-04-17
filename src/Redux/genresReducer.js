const initialState = {
    genres:[]
   };
   
   export default function genresReducer(state = initialState, action) {
       // console.log(state,'confirmReducer')
       switch (action.type) {
         case "GETTING_GENRES":
           return { genres: action.payload };
     
         default:
           return state;
     }
   }