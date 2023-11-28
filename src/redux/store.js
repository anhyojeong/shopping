import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './authActions';
import itemReducer from './itemActions';
import cartReducer from './cartActions';

const rootReducer = combineReducers({
  auth: authReducer,
  item: itemReducer,
  cart: cartReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools()
);

export default store;