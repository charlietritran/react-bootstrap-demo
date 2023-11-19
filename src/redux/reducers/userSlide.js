// INIT STATE OF APP
const initialState = {};

export default function userReducer(state = initialState, action) {
  //alert("INITIAL STATE FROM REDUCER:" + JSON.stringify(initialState));

  switch (action.type) {
    case "user/update":
      //alert("UPDATE STATE WITH DATA:" + JSON.stringify(action.payload));
      return {
        ...state,
        userData: action.payload,
      };

    case "user/register":
      return {
        ...state,
        registration: action.payload,
      };
    //return action.payload;
    default:
      return state;
  }
}
