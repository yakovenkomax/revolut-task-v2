import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from  './reducers';
import { initialWalletState } from './reducers/wallet';
import { initialRatesState } from './reducers/rates';
import { initialExchangeState } from './reducers/exchange';
import { initialUIState } from './reducers/ui';

const initialState = {
  wallet: initialWalletState,
  rates: initialRatesState,
  exchange: initialExchangeState,
  ui: initialUIState,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

export default() => {
  return createStore(
    rootReducer,
    initialState,
    enhancer,
  );
}
