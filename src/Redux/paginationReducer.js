const initialState = {
   page:1
  };
  
  export default function paginationReducer(state = initialState, action) {
      // console.log(state,'confirmReducer')
      switch (action.type) {
        case "UPDATE_PAGE":
          return { page: action.payload };
    
        default:
          return state;
    }
  }