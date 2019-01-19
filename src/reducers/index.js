import { combineReducers } from 'redux';
import wallet from './wallet';
import rates from './rates';
import exchange from './exchange';
import loaders from './loaders';

const rootReducer = combineReducers({
  wallet,
  rates,
  exchange,
  loaders,
});
export default rootReducer;
