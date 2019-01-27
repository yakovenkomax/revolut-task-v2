import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from './reducers';
import { initialWalletState } from './reducers/wallet';
import { initialRatesState } from './reducers/rates';
import { initialFormState } from './reducers/form';
import { initialLoadersState } from './reducers/loaders';

const initialState: AppState = {
  wallet: initialWalletState,
  rates: initialRatesState,
  form: initialFormState,
  loaders: initialLoadersState,
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppAction>),
);

export default() => {
  return createStore(
    rootReducer,
    initialState,
    enhancer,
  );
}
