import { combineReducers } from 'redux';
import wallet from './wallet';
import rates from './rates';
import form from './form';
import loaders from './loaders';

const rootReducer = combineReducers({
  wallet,
  rates,
  form,
  loaders,
});
export default rootReducer;
