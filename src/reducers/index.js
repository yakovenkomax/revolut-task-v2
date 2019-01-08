import { combineReducers } from 'redux';
import wallet from './wallet';
import rates from './rates';

const rootReducer = combineReducers({
  wallet,
  rates,
});
export default rootReducer;