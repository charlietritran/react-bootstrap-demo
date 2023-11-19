import { createStore, applyMiddleware } from 'redux';
import allReducers from './redux/reducers/reducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'


const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(allReducers, composedEnhancer);

export default store;