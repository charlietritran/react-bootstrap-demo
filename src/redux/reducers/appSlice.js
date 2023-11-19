//import AppService from '../citm-services/AppService';


// INIT STATE OF APP
const initialState = {};


/**
 * A reducer to populate citmData to store
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export default function appReducer(state = initialState, action) {
  // console.log("APP REDUCER IS ACCESSED - ACTION:" + JSON.stringify(action));
  switch (action.type) {
    case 'app/citmDataLoaded': {
      return {
        ...state,
        citmData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
