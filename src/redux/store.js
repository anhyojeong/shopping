import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './authActions';
import itemReducer from './itemActions';


const rootReducer = combineReducers({
  auth: authReducer,
  item: itemReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

export default store;