
import appReducer from './appSlice';
import userReducer from './userSlide';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  app: appReducer, // app will be used in selector as base object
  user: userReducer, // same for user
});
export default allReducers;
