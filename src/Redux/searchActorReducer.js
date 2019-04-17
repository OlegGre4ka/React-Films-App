const initialState = {
    searchActorWord:'',
    searchedActors:[1]
   };
   
   export default function searchActorReducer(state = initialState, action) {
       switch (action.type) {
    
           case "UPDATE_SEARCHED_ACTORS":
           return { searchActorWord: action.payloadWord,searchedActors:action.payloadActors };
         default:
           return state;
     }
   }