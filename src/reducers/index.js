import { combineReducers } from 'redux';
import wallet from './wallet';
import rates from './rates';
import exchange from './exchange';

const rootReducer = combineReducers({
  wallet,
  rates,
  exchange,
});
export default rootReducer;