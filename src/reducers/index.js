import { combineReducers } from 'redux';
import wallet from './wallet';
import rates from './rates';
import exchange from './exchange';
import ui from './ui';

const rootReducer = combineReducers({
  wallet,
  rates,
  exchange,
  ui,
});
export default rootReducer;
