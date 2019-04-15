const initialState = {
    actor:[]
   };
   
   export default function actorDetailedReducer(state = initialState, action) {
       // console.log(state,'confirmReducer')
       switch (action.type) {
         case "UPDATE_ACTOR_DETAILED":
           return { actor: action.payload };
     
         default:
           return state;
     }
   }